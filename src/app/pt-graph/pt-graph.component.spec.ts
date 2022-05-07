import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PtGraphComponent } from './pt-graph.component';

describe('PtGraphComponent', () => {
  let component: PtGraphComponent;
  let fixture: ComponentFixture<PtGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PtGraphComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PtGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
