import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersManagingComponent } from './users-managing.component';

describe('UsersComponent', () => {
  let component: UsersManagingComponent;
  let fixture: ComponentFixture<UsersManagingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsersManagingComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UsersManagingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
