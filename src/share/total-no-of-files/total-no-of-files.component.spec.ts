import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalNoOfFilesComponent } from './total-no-of-files.component';

describe('TotalNoOfFilesComponent', () => {
  let component: TotalNoOfFilesComponent;
  let fixture: ComponentFixture<TotalNoOfFilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TotalNoOfFilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalNoOfFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
