import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileReceiveComponent } from './file-receive.component';

describe('FileReceiveComponent', () => {
  let component: FileReceiveComponent;
  let fixture: ComponentFixture<FileReceiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileReceiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileReceiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
