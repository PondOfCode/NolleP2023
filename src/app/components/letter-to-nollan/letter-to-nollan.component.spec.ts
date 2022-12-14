import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LetterToNollanComponent } from './letter-to-nollan.component';

describe('LetterToNollanComponent', () => {
  let component: LetterToNollanComponent;
  let fixture: ComponentFixture<LetterToNollanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LetterToNollanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LetterToNollanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
