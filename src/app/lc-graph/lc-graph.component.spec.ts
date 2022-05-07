import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LcGraphComponent } from './lc-graph.component';

describe('LcGraphComponent', () => {
  let component: LcGraphComponent;
  let fixture: ComponentFixture<LcGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LcGraphComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LcGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
