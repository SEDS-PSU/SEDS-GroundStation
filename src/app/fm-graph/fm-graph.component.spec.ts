import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FmGraphComponent } from './fm-graph.component';

describe('FmGraphComponent', () => {
  let component: FmGraphComponent;
  let fixture: ComponentFixture<FmGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FmGraphComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FmGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
