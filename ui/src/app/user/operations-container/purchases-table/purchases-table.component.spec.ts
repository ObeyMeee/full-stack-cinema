import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasesTableComponent } from './purchases-table.component';

describe('TransactionsTableComponent', () => {
  let component: PurchasesTableComponent;
  let fixture: ComponentFixture<PurchasesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PurchasesTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PurchasesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
