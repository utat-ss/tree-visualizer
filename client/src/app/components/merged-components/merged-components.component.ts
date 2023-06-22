import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core"
import * as go from "gojs"

import { NodeDirectoryComponent } from '../node-directory/node-directory.component';
import { OrgChartComponent } from '../org-chart/org-chart.component';

@Component({
  selector: 'app-merged-components',
  templateUrl: './merged-components.component.html',
  styleUrls: ['./merged-components.component.sass'],
  providers: [NodeDirectoryComponent, OrgChartComponent]
})
export class MergedComponentsComponent implements OnInit{

  @Input()
  public model: go.TreeModel = new go.TreeModel()

  @Output()
  public nodeClicked: EventEmitter<any> = new EventEmitter()

  public ngOnInit() {}
}
