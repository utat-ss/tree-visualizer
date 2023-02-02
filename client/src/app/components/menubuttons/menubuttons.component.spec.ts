import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenubuttonsComponent } from './menubuttons.component';

describe('MenubuttonsComponent', () => {
  let component: MenubuttonsComponent;
  let fixture: ComponentFixture<MenubuttonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenubuttonsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenubuttonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
