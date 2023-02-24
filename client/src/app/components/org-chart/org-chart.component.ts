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
                // properties for the "last parents":
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
                desiredSize: new go.Size(200, 100),
                isShadowed: true,
                shadowOffset: new go.Point(2, 2),
                shadowColor: "#DDD",
                shadowBlur: 6,
            },
            $(go.Shape, "Rectangle", { fill: "white", strokeWidth: 0 }),
            $(
                go.Panel,
                "Table",
                { defaultAlignment: go.Spot.Left },
                $(go.RowColumnDefinition, { column: 1 }),
                $(
                    go.TextBlock,
                    { row: 0, column: 0 },
                    { font: "bold 12pt sans-serif" },
                    new go.Binding("text", "title")
                ),
                // $(
                //     go.Part,
                //     "Auto",
                //     { row: 1, column: 0 },
                //     $(go.Shape, "RoundRectangle", {
                //         fill: "blue",
                //         strokeWidth: 0,
                //         desiredSize: new go.Size(10, 5),
                //     }),
                //     $(go.TextBlock, new go.Binding("text", "type"))
                // ),
                $(
                    go.TextBlock,
                    { row: 2, column: 0 },
                    new go.Binding("text", "description"),
                    {
                        font: "10pt sans-serif",
                        overflow: go.TextBlock.OverflowEllipsis,
                        maxLines: 2,
                    }
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
