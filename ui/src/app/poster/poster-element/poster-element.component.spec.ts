import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PosterElementComponent } from './poster-element.component';

describe('PosterElementComponent', () => {
  let component: PosterElementComponent;
  let fixture: ComponentFixture<PosterElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PosterElementComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PosterElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
