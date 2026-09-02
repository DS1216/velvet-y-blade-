import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReceptionPage } from './reception.page';

describe('ReceptionPage', () => {
  let component: ReceptionPage;
  let fixture: ComponentFixture<ReceptionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceptionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
