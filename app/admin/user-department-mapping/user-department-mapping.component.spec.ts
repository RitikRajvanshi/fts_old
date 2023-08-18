import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDepartmentMappingComponent } from './user-department-mapping.component';

describe('UserDepartmentMappingComponent', () => {
  let component: UserDepartmentMappingComponent;
  let fixture: ComponentFixture<UserDepartmentMappingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDepartmentMappingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDepartmentMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
