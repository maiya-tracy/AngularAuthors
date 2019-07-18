import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewauthorComponent } from './viewauthor.component';

describe('ViewauthorComponent', () => {
  let component: ViewauthorComponent;
  let fixture: ComponentFixture<ViewauthorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewauthorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewauthorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
