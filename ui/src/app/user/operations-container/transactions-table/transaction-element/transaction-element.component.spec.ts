import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionElementComponent } from './transaction-element.component';

describe('TransactionElementComponent', () => {
  let component: TransactionElementComponent;
  let fixture: ComponentFixture<TransactionElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TransactionElementComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TransactionElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
