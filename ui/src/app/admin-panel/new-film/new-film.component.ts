import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import {
  endReleaseAtValidator,
  notBlankValidator,
  productionYearValidator,
  sessionStartAtValidator,
  startReleaseAtValidator
} from './validators';
import { DropdownItem } from '../../shared/dropdown-item.type';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { CrewMember, CrewService } from './services/crew.service';
import { FileUploadHandlerEvent } from 'primeng/fileupload';
import { GenreService } from './services/genre.service';
import { Observable } from 'rxjs';
import { CountryResponse, CountryService } from './services/country.service';
import { FilmService } from '../../shared/services/film.service';
import { NewFilmDto } from './new-film.dto';
import { FirebaseStorageService } from '../../shared/services/firebase-storage.service';
import { ToastService } from '../../shared/services/toast.service';

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
  @ViewChild('formElement') filmFormElementRef!: ElementRef;

  constructor(private formBuilder: FormBuilder,
              private firebaseStorageService: FirebaseStorageService,
              private toastService: ToastService,
              private filmService: FilmService,
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
          generalInfo: this.formBuilder.group({
            title: ['', [Validators.required, notBlankValidator()]],
            description: ['', [Validators.required, notBlankValidator()]],
            genres: this.getFormArray(),
            duration: [1, [Validators.required, Validators.min(1)]],
            productionYear: [now, [Validators.required, productionYearValidator()]],
            countries: this.getFormArray()
            }),
            crew: this.formBuilder.group({
                directors: this.getFormArray(),
                screenwriters: this.getFormArray(),
                actors: this.getFormArray()
            }),
            additionalInfo: this.formBuilder.group({
              language: ['', [Validators.required, notBlankValidator()]],
              ageRestriction: [0, [Validators.required, Validators.min(0), Validators.max(18)]],
              startReleaseAt: [now, [Validators.required, startReleaseAtValidator()]],
              endReleaseAt: [now],
              media: this.formBuilder.group({
                poster: ['', Validators.required],
                trailer: ['', Validators.required]
              })
            }),
            sessions: this.formBuilder.array([this.buildSessionGroup()])
        });
    this.filmForm.get('additionalInfo.startReleaseAt')?.setValidators([
      Validators.required, endReleaseAtValidator(this.filmForm)
    ]);
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
    return this.filmForm.get('generalInfo.genres') as FormArray;
  }

  get countries() {
    return this.filmForm.get('generalInfo.countries') as FormArray;
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
    const formControl = [1, [Validators.required, Validators.min(1)]];
    return this.formBuilder.group({
      startAt: [this.now, [Validators.required, sessionStartAtValidator()]],
      hall: formControl,
      goodRowPrice: formControl,
      luxRowPrice: formControl
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
    const newFilm = this.filmForm.value as NewFilmDto;
    this.firebaseStorageService.uploadFile(newFilm.additionalInfo.media.poster as File)
      .subscribe({
        next: downloadURL => {
          newFilm.additionalInfo.media.poster = downloadURL;
          this.filmService.save(newFilm).data.subscribe({
              next: () => {
                this.toastService.showToast(false, 'You have successfully added new film!', 'success');
                this.resetAll();
                this.activeStep = 0; // return to first page
              },
              error: err => {
                this.toastService.showToast(true, 'Error occurred while saving new film', 'error');
                console.log(err);
              }
            }
          );
        },
        error: err => {
          this.toastService.showToast(true, 'Error occurred while uploading file', 'error');
          console.log(err);
        }
      });
  }

  private resetAll() {
    this.filmForm.reset();
    this.actors.clear()
    this.actors.clear();
    this.screenwriters.clear();
    this.directors.clear();
    this.countries.clear();
    this.genres.clear();
    this.sessions.clear();
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
