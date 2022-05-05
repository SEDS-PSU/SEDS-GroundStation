import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectronicStatesComponent } from './electronic-states.component';

describe('ElectronicStatesComponent', () => {
  let component: ElectronicStatesComponent;
  let fixture: ComponentFixture<ElectronicStatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElectronicStatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ElectronicStatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
