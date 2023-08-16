import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasesTableRowComponent } from './purchases-table-row.component';

describe('PurchasesTableRowComponent', () => {
  let component: PurchasesTableRowComponent;
  let fixture: ComponentFixture<PurchasesTableRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PurchasesTableRowComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PurchasesTableRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
