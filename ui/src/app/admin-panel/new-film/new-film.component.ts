import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { endReleaseAtValidator, productionYearValidator } from './validators';

@Component({
  selector: 'app-new-film',
  templateUrl: './new-film.component.html',
  styleUrls: ['./new-film.component.scss']
})
export class NewFilmComponent implements OnInit {
  filmForm!: FormGroup;

  items!: MenuItem[];
  activeStep = 0;

  constructor(private formBuilder: FormBuilder) {
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
          now.getFullYear(),
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

  addGenre() {
    this.genres.push(this.formBuilder.control(''));
  }

  addCountry() {
    this.countries.push(this.formBuilder.control(''));
  }

  addActor() {
    this.actors.push(this.formBuilder.control(''));
  }

  addSession() {
    this.sessions.push(this.formBuilder.control(''));
  }


  onSubmit() {

  }
}
