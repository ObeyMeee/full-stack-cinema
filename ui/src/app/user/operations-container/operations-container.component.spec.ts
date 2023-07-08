import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationsContainerComponent } from './operations-container.component';

describe('TicketListComponent', () => {
  let component: OperationsContainerComponent;
  let fixture: ComponentFixture<OperationsContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OperationsContainerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OperationsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
