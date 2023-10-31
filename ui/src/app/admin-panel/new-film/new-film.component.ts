import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { endReleaseAtValidator, productionYearValidator } from './validators';
import { DropdownItem } from '../../shared/dropdown-item.type';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { CrewMember, CrewService } from './services/crew.service';
import { FileUploadHandlerEvent } from 'primeng/fileupload';
import { GenreService } from './services/genre.service';
import { Observable } from 'rxjs';
import { CountryResponse, CountryService } from './services/country.service';

type FormControlArray = 'genres' | 'directors' | 'countries' | 'screenwriters' | 'actors' | 'sessions';

@Component({
  selector: 'app-new-film',
  templateUrl: './new-film.component.html',
  styleUrls: ['./new-film.component.scss']
})
export class NewFilmComponent implements OnInit {
  filmForm!: FormGroup;
  items!: MenuItem[];
  activeStep!: number;
    suggestedGenres$!: Observable<DropdownItem[]>;
    suggestedCountries$!: Observable<CountryResponse[]>;
    suggestedCrewMembers!: CrewMember[];
    now = new Date();

  @ViewChild('posterUpload') posterUploadRef!: ElementRef;

  constructor(private formBuilder: FormBuilder,
              private crewService: CrewService,
              private countryService: CountryService,
              private genreService: GenreService) {
  }

  ngOnInit() {
    this.setSteps();
    // if there is no set activeStep then conversion returns 0
    this.activeStep = Number(localStorage.getItem('activeStep'));
    this.buildForm();
  }

  private buildForm() {
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
            sessions: this.formBuilder.array([this.buildSessionGroup()])
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
      if (!this.suggestedGenres$) {
          this.suggestedGenres$ = this.genreService.getAll();
    }
    this.genres.push(this.formBuilder.control(''));
  }

  async addCountry() {
      if (!this.suggestedCountries$) {
          this.suggestedCountries$ = this.countryService.getAll();
    }
    this.countries.push(this.formBuilder.control(''));
  }

  addActor() {
    this.actors.push(this.formBuilder.control(''));
  }

  addSession() {
      this.sessions.push(this.buildSessionGroup());
  }

  buildSessionGroup() {
        return this.formBuilder.group({
            startAt: [this.now, Validators.required],
            hall: [1, [Validators.required, Validators.min(1)]],
            goodRowPrice: [1, [Validators.required, Validators.min(1)]],
            luxRowPrice: [1, [Validators.required, Validators.min(1)]]
        });
    }

  addScreenwriter() {
    this.screenwriters.push(this.formBuilder.control(''));
  }

  addDirector() {
    this.directors.push(this.formBuilder.control(''));
  }

  deleteFormControlAt(formControlArray: FormControlArray, index: number) {
        this[formControlArray].removeAt(index);
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
