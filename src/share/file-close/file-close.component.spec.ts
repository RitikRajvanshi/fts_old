import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileCloseComponent } from './file-close.component';

describe('FileCloseComponent', () => {
  let component: FileCloseComponent;
  let fixture: ComponentFixture<FileCloseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileCloseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileCloseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
