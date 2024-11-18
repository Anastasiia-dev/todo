import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalanderWidgetComponent } from './calander-widget.component';

describe('CalanderWidgetComponent', () => {
  let component: CalanderWidgetComponent;
  let fixture: ComponentFixture<CalanderWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalanderWidgetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalanderWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
