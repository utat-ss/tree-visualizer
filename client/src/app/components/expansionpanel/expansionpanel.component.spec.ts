import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ExpansionpanelComponent } from './expansionpanel.component';

describe('ExpansionpanelComponent', () => {
  let component: ExpansionpanelComponent;
  let fixture: ComponentFixture<ExpansionpanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpansionpanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpansionpanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
