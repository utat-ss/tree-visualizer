import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectorComponent } from './inspector.component';
import { GojsAngularModule } from 'gojs-angular';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('InspectorComponent', () => {
  let component: InspectorComponent;
  let fixture: ComponentFixture<InspectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        GojsAngularModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        NoopAnimationsModule    // don't care about animations for now
      ],
      declarations: [ InspectorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InspectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
