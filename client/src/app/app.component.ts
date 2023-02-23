import { Component } from '@angular/core';
import * as go from 'gojs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'tree-visualizer';

  public selectedNode: go.Part | null = null;

  public model: go.TreeModel = new go.TreeModel([
    { key: 1, name: 'Alpha'},
    { key: 2, name: 'Beta', parent: 1 },
    { key: 3, name: 'Gamma', parent: 1 },
    { key: 4, name: 'Delta', parent: 2 },
    { key: 5, name: 'Epsilon', parent: 2 },
  ]);

  public setSelectedNode(node: go.Part | null){
    this.selectedNode = node;
  }
}
