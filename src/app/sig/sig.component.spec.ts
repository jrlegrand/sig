import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SigComponent } from './sig.component';

describe('SigComponent', () => {
  let component: SigComponent;
  let fixture: ComponentFixture<SigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
