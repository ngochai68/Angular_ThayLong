import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DuanChitietComponent } from './duan-chitiet.component';

describe('DuanChitietComponent', () => {
  let component: DuanChitietComponent;
  let fixture: ComponentFixture<DuanChitietComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DuanChitietComponent]
    });
    fixture = TestBed.createComponent(DuanChitietComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
