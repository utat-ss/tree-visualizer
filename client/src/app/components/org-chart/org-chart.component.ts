import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as go from 'gojs';

const $ = go.GraphObject.make;

@Component({
    selector: 'app-org-chart',
    templateUrl: './org-chart.component.html',
    styleUrls: ['./org-chart.component.sass'],
})
export class OrgChartComponent implements OnInit {
    public diagram: go.Diagram = new go.Diagram();

    @Input()
    public model: go.TreeModel = new go.TreeModel();

    @Output()
    public nodeClicked = new EventEmitter();

    constructor() {}

    public ngOnInit() {}

    public ngAfterViewInit(): void {
        this.diagram = $(go.Diagram, 'app-org-chart', {
            allowCopy: true,
            allowDelete: true,
            maxSelectionCount: 1,
            validCycle: go.Diagram.CycleDestinationTree, // make sure users can only create trees
            'clickCreatingTool.archetypeNodeData': {
                // allow double-click in background to create a new node
                name: 'new node',
                parent: '',
            },
            layout: $(go.TreeLayout, {
                isOngoing: true,
                treeStyle: go.TreeLayout.StyleLastParents,
                arrangement: go.TreeLayout.ArrangementHorizontal,
                // properties for most of the tree:
                angle: 90,
                layerSpacing: 35,
                // properties for the "last parents":
                alternateAngle: 90,
                alternateLayerSpacing: 35,
                alternateAlignment: go.TreeLayout.AlignmentBus,
                alternateNodeSpacing: 20,
            }),
            'undoManager.isEnabled': true,
        });

        this.diagram.nodeTemplate = $(
            go.Node,
            'Spot',
            // for sorting, have the Node.text be the data.name
            new go.Binding('text', 'name'),
            // bind the Part.layerName to control the Node's layer depending on whether it isSelected
            new go.Binding('layerName', 'isSelected', (sel) =>
                sel ? 'Foreground' : ''
            ).ofObject(),
            new go.Binding('isTreeExpanded').makeTwoWay(),
            $(
                'TreeExpanderButton',
                {
                    name: 'BUTTONX',
                    alignment: go.Spot.Bottom,
                    opacity: 0, // initially not visible
                    _treeExpandedFigure: 'TriangleUp',
                    _treeCollapsedFigure: 'TriangleDown',
                },
                // button is visible either when node is selected or on mouse-over
                new go.Binding('opacity', 'isSelected', (s) =>
                    s ? 1 : 0
                ).ofObject()
            )
        );

        this.diagram.model = this.model;

        // when selection changes, emit event to update the selected node
        this.diagram.addDiagramListener('ChangedSelection', (e) => {
            const node = this.diagram.selection.first();
            this.nodeClicked.emit(node);
        });
    }
}
