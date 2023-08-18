import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileInitiationComponent } from './file-initiation.component';

describe('FileInitiationComponent', () => {
  let component: FileInitiationComponent;
  let fixture: ComponentFixture<FileInitiationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileInitiationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileInitiationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
