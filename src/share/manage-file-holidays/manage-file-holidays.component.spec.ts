import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageFileHolidaysComponent } from './manage-file-holidays.component';

describe('ManageFileHolidaysComponent', () => {
  let component: ManageFileHolidaysComponent;
  let fixture: ComponentFixture<ManageFileHolidaysComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageFileHolidaysComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageFileHolidaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
