import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SequencingComponent } from './sequencing.component';

describe('SequencingComponent', () => {
  let component: SequencingComponent;
  let fixture: ComponentFixture<SequencingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SequencingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SequencingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
