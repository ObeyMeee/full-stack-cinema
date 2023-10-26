import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { endReleaseAtValidator, productionYearValidator } from './validators';
import { environment } from '../../../environments/environment.development';
import { DropdownItem } from '../../shared/dropdown-item.type';
import { HttpClient } from '@angular/common/http';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { CrewService } from './crew.service';
import { FileUploadHandlerEvent } from 'primeng/fileupload';

@Component({
  selector: 'app-new-film',
  templateUrl: './new-film.component.html',
  styleUrls: ['./new-film.component.scss']
})
export class NewFilmComponent implements OnInit {
  filmForm!: FormGroup;
  items!: MenuItem[];
  activeStep!: number;
  suggestedGenres!: DropdownItem[];
  suggestedCountries!: { name: string, flag: { png: string, alt: string } }[];
  suggestedCrewMembers!: CrewMember[];
  minEndReleaseAt = new Date();

  @ViewChild('posterUpload') posterUploadRef!: ElementRef;

  constructor(private formBuilder: FormBuilder,
              private http: HttpClient,
              private crewService: CrewService) {
  }

  ngOnInit() {
    this.setSteps();
    // if there is no set activeStep then conversion returns 0
    this.activeStep = Number(localStorage.getItem('activeStep'));
    const now = new Date();
    this.filmForm = this.formBuilder.group({
      generalInformation: this.formBuilder.group({
        title: ['', Validators.required],
        description: ['', Validators.required],
        genres: this.getFormArray(),
        duration: [1, [Validators.required, Validators.min(1)]],
        productionYear: [
          now,
          [
            Validators.required,
            productionYearValidator()
          ]
        ],
        countries: this.getFormArray()
      }),
      crew: this.formBuilder.group({
        directors: this.getFormArray(),
        screenwriters: this.getFormArray(),
        actors: this.getFormArray()
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

  private getFormArray() {
    return this.formBuilder.array<string>([]);
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

  get directors() {
    return this.filmForm.get('crew.directors') as FormArray;
  }

  get screenwriters() {
    return this.filmForm.get('crew.screenwriters') as FormArray;
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
      params: {
        api_key: environment.tmdb.apiKey
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

  addScreenwriter() {
    this.screenwriters.push(this.formBuilder.control(''));
  }

  addDirector() {
    this.directors.push(this.formBuilder.control(''));
  }

  deleteGenre(index: number) {
    this.genres.removeAt(index);
  }

  deleteDirector(index: number) {
    this.directors.removeAt(index);
  }

  deleteCountry(index: number) {
    this.countries.removeAt(index);
  }

  deleteScreenwriter(index: number) {
    this.screenwriters.removeAt(index);
  }

  deleteActor(index: number) {
    this.actors.removeAt(index);
  }

  onSubmit() {
    console.log(this.filmForm.value);
  }

  onMove(step: number) {
    this.activeStep += step;
    this.setStepToLocalStorage()
  }

  async filterPeople($event: AutoCompleteCompleteEvent) {
    (await this.crewService.filterCrewMembers($event.query)).subscribe(
      crewMembers => this.suggestedCrewMembers = [...crewMembers]
    );
  }

  uploadFile($event: FileUploadHandlerEvent) {
    this.filmForm.patchValue({
      additionalInfo: {
        media: {
          poster: $event.files[0]
        }
      }
    });
    this.filmForm.get('additionalInfo.media.poster')?.updateValueAndValidity();
  }

  setStepToLocalStorage() {
    localStorage.setItem('activeStep', this.activeStep.toString())
  }
}

interface GenreResponse {
  genres: {
    id: number,
    name: string
  }[];
}

type CrewMember = {
  name: string,
  imgUrl: string
}
