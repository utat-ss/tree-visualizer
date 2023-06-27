import { Component, Input, OnInit } from '@angular/core';
import * as go from 'gojs';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent {

  public _selectedNode: go.Node = new go.Node;
  public data = {
    name: null,
    parent: null
  };

  @Input()
  public model: go.Model = new go.Model;

  @Input()
  get selectedNode() { return this._selectedNode; }
  set selectedNode(node: go.Node) {
    if (node && node != null) {
      this._selectedNode = node;
      this.data.name = this._selectedNode.data.name;
      this.data.parent = this._selectedNode.data.parent;
    } else {
      this._selectedNode = new go.Node;
    }
  }

  constructor() { }

  public onCommitForm() {
    this.model.startTransaction();
    this.model.set(this.selectedNode.data, 'name', this.data.name);
    this.model.set(this.selectedNode.data, 'parent', this.data.parent);
    this.model.commitTransaction();
  }

}