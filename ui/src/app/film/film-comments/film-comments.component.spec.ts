import {ComponentFixture, TestBed} from '@angular/core/testing';

import {FilmCommentsComponent} from './film-comments.component';

describe('FilmCommentsComponent', () => {
  let component: FilmCommentsComponent;
  let fixture: ComponentFixture<FilmCommentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilmCommentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilmCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
