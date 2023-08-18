import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReopenClosedComponent } from './reopen-closed.component';

describe('ReopenClosedComponent', () => {
  let component: ReopenClosedComponent;
  let fixture: ComponentFixture<ReopenClosedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReopenClosedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReopenClosedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
