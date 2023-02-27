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
    public showMap = true

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
                mouseDragEnter: (e, node, prev) => {
                    const shape: go.Shape = (node as go.Part).findObject(
                        "SHAPE"
                    ) as go.Shape
                    shape.stroke = "dodgerblue"
                    shape.strokeWidth = 3

                    const shape2: go.Shape = (prev as go.Part).findObject(
                        "SHAPE"
                    ) as go.Shape
                    shape2.stroke = "green"
                    shape2.strokeWidth = 3
                },
                mouseDragLeave: (e, node, next) => {
                    const shape: go.Shape = (node as go.Part).findObject(
                        "SHAPE"
                    ) as go.Shape
                    shape.stroke = "dodgerblue"
                    shape.strokeWidth = 0
                },
                mouseDrop: (e, node) => {
                    const diagram = node.diagram
                    const selnode = diagram?.selection.first() as go.Node // assume just one Node in selection
                    // find any existing link into the selected node
                    const link = selnode.findTreeParentLink()
                    if (link !== null) {
                        // reconnect any existing link
                        link.fromNode = node as go.Node
                    } else {
                        // else create a new link
                        diagram?.toolManager.linkingTool.insertLink(
                            node as go.Node,
                            (node as go.Node).port,
                            selnode,
                            selnode.port
                        )
                    }
                },
            },
            $(go.Shape, "Rectangle", { name: "SHAPE", fill: "white", strokeWidth: 0 }),
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

        this.diagram.linkTemplate = $(
            go.Link, // the whole link panel
            go.Link.Orthogonal,
            $(go.Shape) // the link shape, default black stroke
        )

        this.diagram.model = this.model

        // when selection changes, emit event to update the selected node
        this.diagram.addDiagramListener("ChangedSelection", (e) => {
            const node = this.diagram.selection.first()
            this.nodeClicked.emit(node)
        })
    }
}
