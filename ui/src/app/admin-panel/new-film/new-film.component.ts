import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { endReleaseAtValidator, productionYearValidator } from './validators';
import { environment } from '../../../environments/environment.development';
import { DropdownItem } from '../../shared/dropdown-item.type';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-new-film',
  templateUrl: './new-film.component.html',
  styleUrls: ['./new-film.component.scss']
})
export class NewFilmComponent implements OnInit {
  filmForm!: FormGroup;
  items!: MenuItem[];
  activeStep = 0;
  suggestedGenres!: DropdownItem[];
  suggestedCountries!: { name: string, flag: { png: string, alt: string } }[];

  constructor(private formBuilder: FormBuilder,
              private http: HttpClient) {
  }

  ngOnInit() {
    this.setSteps();
    const now = new Date();
    this.filmForm = this.formBuilder.group({
      generalInformation: this.formBuilder.group({
        title: ['', Validators.required],
        description: ['', Validators.required],
        genres: this.formBuilder.array<string>([]),
        duration: [1, [Validators.required, Validators.min(1)]],
        productionYear: [
          now,
          [
            Validators.required,
            productionYearValidator()
          ]
        ],
        countries: this.formBuilder.array<string>([])
      }),
      crew: this.formBuilder.group({
        director: ['', Validators.required],
        screenwriter: ['', Validators.required],
        actors: this.formBuilder.array<string>([])
      }),
      additionalInfo: this.formBuilder.group({
        language: ['', Validators.required],
        age: [0, [Validators.required, Validators.min(0), Validators.max(18)]],
        startReleaseAt: [now, [Validators.required]],
        endReleaseAt: [now, [Validators.required, endReleaseAtValidator()]],
        media: this.formBuilder.group({
          poster: ['', Validators.required],
          trailer: ['', Validators.required]
        })
      }),
      sessions: this.formBuilder.array([], Validators.required)
    });
  }

  setSteps() {
    this.items = [
      { label: 'General Info' },
      { label: 'Crew' },
      { label: 'Additional Info' },
      { label: 'Sessions' }
    ];
  }

  get sessions() {
    return this.filmForm.get('sessions') as FormArray;
  }

  get genres() {
    return this.filmForm.get('generalInformation.genres') as FormArray;
  }

  get countries() {
    return this.filmForm.get('generalInformation.countries') as FormArray;
  }

  get actors() {
    return this.filmForm.get('crew.actors') as FormArray;
  }

  async addGenre() {
    if (!this.suggestedGenres) {
      await this.setSuggestedGenres();
    }
    this.genres.push(this.formBuilder.control(''));
  }

  private async setSuggestedGenres() {
    const options = {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${environment.tmdb.accessToken}`
      }
    };
    const url = `${environment.tmdb.apiUrl}genre/movie/list`;
    this.http.get<GenreResponse>(url, options)
      .subscribe({
        next: data =>
          this.suggestedGenres = data.genres.map(
            genre => ({ label: genre.name, value: genre.name })
          ),
        error: err => {
          throw new Error(err.message);
        }
      });
  }

  async addCountry() {
    if (!this.suggestedCountries) {
      await this.setSuggestedCountries();
    }
    this.countries.push(this.formBuilder.control(''));
  }


  private async setSuggestedCountries() {
    const url = `${environment.countryApiUrl}all`;
    this.http.get<any>(url)
      .subscribe({
        next: (data: any[]) =>
          this.suggestedCountries = data.map(
            country => ({
              name: country.name.common,
              flag: {
                png: country.flags.png,
                alt: country.flags.alt
              }
            })
          ).sort((a, b) => a.name.localeCompare(b.name)),
        error: err => {
          throw new Error(err.message);
        }
      });
  }

  addActor() {
    this.actors.push(this.formBuilder.control(''));
  }

  addSession() {
    this.sessions.push(this.formBuilder.control(''));
  }

  deleteGenre(index: number) {
    this.genres.removeAt(index);
  }

  deleteCountry(index: number) {
    this['countries'].removeAt(index);
    this.countries.removeAt(index);
  }

  onSubmit() {

  }

  onMove(step: number) {
    this.activeStep += step;
  }
}

interface GenreResponse {
  genres: {
    id: number,
    name: string
  }[];
}
