import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileHoldingInformationComponent } from './file-holding-information.component';

describe('FileHoldingInformationComponent', () => {
  let component: FileHoldingInformationComponent;
  let fixture: ComponentFixture<FileHoldingInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileHoldingInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileHoldingInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
