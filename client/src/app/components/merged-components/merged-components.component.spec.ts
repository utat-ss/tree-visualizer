import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MergedComponentsComponent } from './merged-components.component';

describe('MergedComponentsComponent', () => {
  let component: MergedComponentsComponent;
  let fixture: ComponentFixture<MergedComponentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MergedComponentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MergedComponentsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
