import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckEngineComponent } from './check-engine.component';

describe('CheckEngineComponent', () => {
    let component: CheckEngineComponent;
    let fixture: ComponentFixture<CheckEngineComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CheckEngineComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CheckEngineComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});