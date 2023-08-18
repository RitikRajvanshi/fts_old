import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllFileTrackerComponent } from './all-file-tracker.component';

describe('AllFileTrackerComponent', () => {
  let component: AllFileTrackerComponent;
  let fixture: ComponentFixture<AllFileTrackerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllFileTrackerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllFileTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
