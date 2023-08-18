import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HoldingFilesDatewiseReportComponent } from './holding-files-datewise-report.component';

describe('HoldingFilesDatewiseReportComponent', () => {
  let component: HoldingFilesDatewiseReportComponent;
  let fixture: ComponentFixture<HoldingFilesDatewiseReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HoldingFilesDatewiseReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HoldingFilesDatewiseReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
