import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmCommentComponent } from './film-comment.component';

describe('FilmCommentComponent', () => {
  let component: FilmCommentComponent;
  let fixture: ComponentFixture<FilmCommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FilmCommentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FilmCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
