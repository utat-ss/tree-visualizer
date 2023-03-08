import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NodeDirectoryComponent } from './node-directory.component';

describe('NodeDirectoryComponent', () => {
  let component: NodeDirectoryComponent;
  let fixture: ComponentFixture<NodeDirectoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NodeDirectoryComponent ]
    }).compileComponents();

    fixture = TestBed.createComponent(NodeDirectoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
