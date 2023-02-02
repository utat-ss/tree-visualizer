import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SinglebuttonsComponent } from './singlebuttons.component';

describe('SinglebuttonsComponent', () => {
  let component: SinglebuttonsComponent;
  let fixture: ComponentFixture<SinglebuttonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SinglebuttonsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SinglebuttonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
