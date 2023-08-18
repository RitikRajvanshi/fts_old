import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSuggestionsComponent } from './update-suggestions.component';

describe('UpdateSuggestionsComponent', () => {
  let component: UpdateSuggestionsComponent;
  let fixture: ComponentFixture<UpdateSuggestionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateSuggestionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateSuggestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
