import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TcGraphComponent } from './tc-graph.component';

describe('TcGraphComponent', () => {
  let component: TcGraphComponent;
  let fixture: ComponentFixture<TcGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TcGraphComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TcGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
