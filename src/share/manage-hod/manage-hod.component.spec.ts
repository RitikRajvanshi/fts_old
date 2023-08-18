import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageHODComponent } from './manage-hod.component';

describe('ManageHODComponent', () => {
  let component: ManageHODComponent;
  let fixture: ComponentFixture<ManageHODComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageHODComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageHODComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
