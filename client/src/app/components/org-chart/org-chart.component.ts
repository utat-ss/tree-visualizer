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
    public minimap: go.Overview | null = null
    public nodeSize = new go.Size(256, 128)
    public font = "sans-serif"

    public _selectedNode: go.Node | null = null;
    public node_found: go.Node | null = null;

    @Input() 
    public model: go.TreeModel = new go.TreeModel()

    @Input()
    get selectedNode() { return this._selectedNode; }
    set selectedNode(node: go.Node | null) {
        if (node != null) {
        this._selectedNode = node;
        console.log('Node clicked:')
        console.log(this._selectedNode.data)

        if (this.node_found != null) {
            // set the previous selected node to false
            this.diagram.model.setDataProperty(this.node_found.data, 'isSelected', false)
            this.diagram.updateAllTargetBindings();
        }
        this.node_found = this.diagram.findNodeForKey(this._selectedNode.data.id)
        console.log('Looking for node')
        if (this.node_found !== null) {
            console.log('Node found:')
            console.log(this.node_found.data)

            console.log(this.node_found.data.isSelected)
            this.diagram.model.setDataProperty(this.node_found.data, 'isSelected', 'true')
            console.log(this.node_found.data.isSelected)
            this.diagram.updateAllTargetBindings();
        } else {
            // Node not found
            console.log("Node not found");
        }

        } else {
        this._selectedNode = null;
        if (this.node_found != null) {
            // set the previous selected node to false
            this.diagram.model.setDataProperty(this.node_found.data, 'isSelected', false)
            this.diagram.updateAllTargetBindings();
        }
        }
    }

    @Output() 
    public nodeClicked = new EventEmitter()

    public showMap = true

    constructor() {}

    public ngOnInit() {
        console.log(this.selectedNode)
        console.log('ngOnInig')
    }

    public ngAfterViewInit() {
        this.diagram = $(go.Diagram, "app-org-chart", {
            allowCopy: false,
            allowDelete: false,
            layout: $(go.TreeLayout, {
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
                selectionAdorned: false,
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
            $(go.Shape,
                "Rectangle",
                {
                  name: "SHAPE",
                  strokeWidth: 2,
                },
                new go.Binding("fill", "", function(data) {
                  return data.isSelected ? "lightblue" : "white";
                }),
                new go.Binding("stroke", "", function(data) {
                    return data.isSelected ? "dodgerblue" : null;
                  })
              ),
            $(
                go.Panel,
                "Table",
                {
                    alignment: go.Spot.TopLeft,
                    margin: 16,
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
                    go.Shape, // chip
                    "RoundedRectangle",
                    {
                        row: 1,
                        column: 0,
                        width: 70,
                        height: 18,
                        parameter1: 100,
                        strokeWidth: 0,
                    },
                    new go.Binding("fill", "qualifier", (qualifier) => {
                        if (qualifier === "SHALL") {
                            return "#06c769" // green
                        } else if (qualifier === "SHOULD") {
                            return "#2196f3" // blue
                        } else {
                            return "#cccccc" // default grey
                        }
                    })
                ),
                $(
                    go.TextBlock,
                    {
                        row: 1,
                        column: 0,
                        font: "10pt " + this.font,
                        stroke: "white",
                        margin: 6,
                    },
                    new go.Binding("text", "qualifier")
                ),
                $(
                    go.TextBlock,
                    {
                        row: 2,
                        column: 0,
                        font: "10pt " + this.font,
                        stretch: go.GraphObject.Fill,
                        maxLines: 3,
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

        this.minimap = $(go.Overview, "app-minimap", { observed: this.diagram })

        this.diagram.model = this.model

        // when selection changes, emit event to update the selected node
        this.diagram.addDiagramListener("ChangedSelection", (e) => {
            const node = this.diagram?.selection.first()
            console.log(this.model.toJson())
            this.nodeClicked.emit(node)
        })
    }
}
