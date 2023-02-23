import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as go from 'gojs';

@Component({
  selector: 'app-org-chart',
  templateUrl: './org-chart.component.html',
  styleUrls: ['./org-chart.component.sass']
})
export class OrgChartComponent implements OnInit {
  public diagram: go.Diagram = new go.Diagram();

  @Input()
  public model: go.TreeModel = new go.TreeModel();

  @Output()
  public nodeClicked = new EventEmitter();

  constructor() {
  }

  public ngOnInit() {
    
  }

  public ngAfterViewInit(): void {
    this.diagram = go.GraphObject.make(go.Diagram, 'app-org-chart')
    
    this.diagram.model = this.model;

    // when selection changes, emit event to update the selected node
    this.diagram.addDiagramListener('ChangedSelection', (e) => {
      const node = this.diagram.selection.first();
      this.nodeClicked.emit(node);
    });
  }

}
