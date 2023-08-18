import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FtsDbdesignComponent } from './fts-dbdesign.component';

describe('FtsDbdesignComponent', () => {
  let component: FtsDbdesignComponent;
  let fixture: ComponentFixture<FtsDbdesignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FtsDbdesignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FtsDbdesignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
