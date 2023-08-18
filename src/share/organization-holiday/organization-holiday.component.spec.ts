import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationHolidayComponent } from './organization-holiday.component';

describe('OrganizationHolidayComponent', () => {
  let component: OrganizationHolidayComponent;
  let fixture: ComponentFixture<OrganizationHolidayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizationHolidayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationHolidayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
