import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconTextComponent } from './icon-text.component';

describe('IconTextComponent', () => {
  let component: IconTextComponent;
  let fixture: ComponentFixture<IconTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IconTextComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IconTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
