import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageOrganizationHolidayComponent } from './manage-organization-holiday.component';

describe('ManageOrganizationHolidayComponent', () => {
  let component: ManageOrganizationHolidayComponent;
  let fixture: ComponentFixture<ManageOrganizationHolidayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageOrganizationHolidayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageOrganizationHolidayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
