import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NhanviensComponent } from './nhanviens.component';

describe('NhanviensComponent', () => {
  let component: NhanviensComponent;
  let fixture: ComponentFixture<NhanviensComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NhanviensComponent]
    });
    fixture = TestBed.createComponent(NhanviensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
