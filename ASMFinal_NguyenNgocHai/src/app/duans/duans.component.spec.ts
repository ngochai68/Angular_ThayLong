import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DuansComponent } from './duans.component';

describe('DuansComponent', () => {
  let component: DuansComponent;
  let fixture: ComponentFixture<DuansComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DuansComponent]
    });
    fixture = TestBed.createComponent(DuansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
