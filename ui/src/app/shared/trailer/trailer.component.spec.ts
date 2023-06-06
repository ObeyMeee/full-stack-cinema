import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrailerComponent } from './trailer.component';

describe('TrailerComponent', () => {
  let component: TrailerComponent;
  let fixture: ComponentFixture<TrailerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrailerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrailerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
