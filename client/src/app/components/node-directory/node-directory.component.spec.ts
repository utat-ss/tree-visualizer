import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GojsAngularModule } from 'gojs-angular';

import { NodeDirectoryComponent } from './node-directory.component';

describe('NodeDirectoryComponent', () => {
  let component: NodeDirectoryComponent;
  let fixture: ComponentFixture<NodeDirectoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ GojsAngularModule ],
      declarations: [ NodeDirectoryComponent ]
    }).compileComponents();

    fixture = TestBed.createComponent(NodeDirectoryComponent);
    component = fixture.componentInstance;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
