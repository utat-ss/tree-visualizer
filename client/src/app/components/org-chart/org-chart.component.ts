import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core"
import * as go from "gojs"

const $ = go.GraphObject.make

@Component({
    selector: "app-org-chart",
    templateUrl: "./org-chart.component.html",
    styleUrls: ["./org-chart.component.sass"],
})
export class OrgChartComponent implements OnInit {
    public diagram: go.Diagram = new go.Diagram()
    private nodeSize = new go.Size(256, 128)
    private font = "sans-serif"

    @Input()
    public model: go.TreeModel = new go.TreeModel()

    @Output()
    public nodeClicked = new EventEmitter()

    constructor() {}

    public ngOnInit() {}

    public ngAfterViewInit(): void {
        this.diagram = $(go.Diagram, "app-org-chart", {
            allowCopy: false,
            allowDelete: false,
            validCycle: go.Diagram.CycleDestinationTree, // make sure users can only create trees
            layout: $(go.TreeLayout, {
                isOngoing: true,
                treeStyle: go.TreeLayout.StyleLastParents,
                arrangement: go.TreeLayout.ArrangementHorizontal,
                // properties for most of the tree:
                angle: 90,
                layerSpacing: 35,
                // properties for the leaf parents:
                alternateAngle: 90,
                alternateLayerSpacing: 35,
                alternateAlignment: go.TreeLayout.AlignmentBus,
                alternateNodeSpacing: 20,
            }),
            "undoManager.isEnabled": true,
        })

        this.diagram.nodeTemplate = $(
            go.Node,
            "Auto",
            {
                desiredSize: this.nodeSize,
                isShadowed: true,
                shadowOffset: new go.Point(2, 2),
                shadowColor: "#DDD",
                shadowBlur: 6,
            },
            $(go.Shape, "Rectangle", { fill: "white", strokeWidth: 0 }),
            $(
                go.Panel,
                "Table",
                {
                    alignment: go.Spot.TopLeft,
                    padding: 16,
                    defaultAlignment: go.Spot.Left,
                },
                $(go.RowColumnDefinition, {
                    column: 0,
                    width: this.nodeSize.width - 50,
                }),
                $(
                    go.TextBlock,
                    {
                        row: 0,
                        column: 0,
                        font: "bold 12pt " + this.font,
                        overflow: go.TextBlock.OverflowEllipsis,
                    },
                    new go.Binding("text", "title")
                ),
                $(
                    go.TextBlock,
                    {
                        row: 1,
                        column: 0,
                        font: "10pt " + this.font,
                        stretch: go.GraphObject.Fill,
                        maxLines: 6,
                        overflow: go.TextBlock.OverflowEllipsis,
                    },
                    new go.Binding("text", "description")
                )
            )
        )

        this.diagram.model = this.model

        // when selection changes, emit event to update the selected node
        this.diagram.addDiagramListener("ChangedSelection", (e) => {
            const node = this.diagram.selection.first()
            this.nodeClicked.emit(node)
        })
    }
}
