import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileOnMyDeskComponent } from './file-on-my-desk.component';

describe('FileOnMyDeskComponent', () => {
  let component: FileOnMyDeskComponent;
  let fixture: ComponentFixture<FileOnMyDeskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileOnMyDeskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileOnMyDeskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
