import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmsManagingComponent } from './films-managing.component';

describe('FilmsComponent', () => {
  let component: FilmsManagingComponent;
  let fixture: ComponentFixture<FilmsManagingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FilmsManagingComponent]
    });
    fixture = TestBed.createComponent(FilmsManagingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
