import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from "@angular/core"
import * as go from "gojs"
import { bufferToggle } from "rxjs";

const $ = go.GraphObject.make

@Component({
  selector: 'app-node-directory',
  templateUrl: './node-directory.component.html',
  styleUrls: ['./node-directory.component.sass']
})
export class NodeDirectoryComponent implements OnInit, AfterViewInit {
  public diagram: go.Diagram = new go.Diagram()
  
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
      console.log(this._selectedNode.data.title)

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

        const panToSelectedNode = (node_found: go.Node | null) => {
          if (node_found !== null) {
            var nodeBounds = node_found.actualBounds;
            var viewportBounds = this.diagram.viewportBounds;

            if (!viewportBounds.containsRect(nodeBounds)) {
              var offsetY = (viewportBounds.height - nodeBounds.height) / 2;
              var position = new go.Point(0, nodeBounds.y - offsetY);
              this.diagram.position = position;
              console.log('PANNED')
            }
          }
        }

        panToSelectedNode(this.node_found)

        console.log(this.node_found.data.isSelected)
        this.diagram.model.setDataProperty(this.node_found.data, 'isSelected', true)
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

  constructor() {}

  public ngOnInit() {
    console.log(this.selectedNode)
    console.log('ngOnInit')
  }

  public ngAfterViewInit() {

      this.diagram = $(go.Diagram, "app-node-directory",
      {
        allowMove: false,
        allowCopy: false,
        allowDelete: false,
        allowHorizontalScroll: true,
        allowVerticalScroll: true,
        contentAlignment: go.Spot.TopLeft,
        padding: new go.Margin(100, 0),
        layout:
          $(go.TreeLayout,
            {
              alignment: go.TreeLayout.AlignmentStart,
              angle: 0,
              compaction: go.TreeLayout.CompactionNone,
              layerSpacing: 16,
              layerSpacingParentOverlap: 1,
              nodeIndentPastParent: 1.0,
              nodeSpacing: 0,
              setsPortSpot: false,
              setsChildPortSpot: false
            })
      });

    // define the Node template
    this.diagram.nodeTemplate =
      $(go.Node, {
        selectionAdorned: false,
      },
      /*$(go.Shape, "Rectangle",
        {
          fill: null,
          strokeWidth: 2,
          width: 500,
          height: 17,
        },
        
        new go.Binding("stroke", "", function(data) {
          return data.isSelected ? "dodgerblue" : null;
        },
      ),
        new go.Binding("fill", "", function(data) {
          return data.isSelected ? "lightblue" : "white";
        },
        ),
        
      ),*/
      $("TreeExpanderButton",
        { // customize the button's appearance
          "_treeExpandedFigure": "LineDown",
          "_treeCollapsedFigure": "LineRight",
          "ButtonBorder.fill": "whitesmoke",
          "ButtonBorder.stroke": null,
          "_buttonFillOver": "rgba(0,128,255,0.25)",
          "_buttonStrokeOver": null,
        }),
      $(go.Panel, "Horizontal",
        { 
          position: new go.Point(18, 0),
        },
        $(go.Picture,
          {
            width: 18, height: 18,
            margin: new go.Margin(0, 4, 0, 0),
            imageStretch: go.GraphObject.Uniform
          },
          // bind the picture source on two properties of the Node
          // to display open folder, closed folder, or document
          new go.Binding("source", "isTreeExpanded", imageConverter).ofObject(),
          new go.Binding("source", "isTreeLeaf", imageConverter).ofObject()),
        $(go.TextBlock,
          {},
          new go.Binding("background", "", function(data) {
            return data.isSelected ? "lightblue" : null;
          },
        ),
          new go.Binding("font", "", function(data) {
            return data.isSelected ? 'bold 9pt Verdana, sans-serif' : '9pt Verdana, sans-serif';
          },
        ),
          new go.Binding("stroke", "", function(data) {
            return data.isSelected ? '#0960D4' : 'black';
          },
        ),
          new go.Binding("text", "title", s => "" + s))
      ),  // end Horizontal Panel
    );  // end Node

  this.diagram.linkTemplate = $(go.Link)

  this.diagram.model = this.model;

  // when selection changes, emit event to update the selected node
  this.diagram.addDiagramListener("ChangedSelection", (e) => {
    const node = this.diagram?.selection.first()
    console.log(this.model.toJson())
    this.nodeClicked.emit(node)
  })

  // takes a property change on either isTreeLeaf or isTreeExpanded and selects the correct image to use
  function imageConverter(prop: any, picture: any) {
    var node = picture.part;
    if (node.isTreeLeaf) {
      return "https://www.iconpacks.net/icons/1/free-document-icon-901-thumb.png";
    } else {
      if (node.isTreeExpanded) {
        return "https://www.clipartmax.com/png/middle/129-1292051_lower-nursery-open-folder-icon-png.png";
      } else {
        return "https://img.icons8.com/color/512/folder-invoices--v1.png";
      }
    }
  }
  window.addEventListener('DOMContentLoaded', this.ngAfterViewInit);
  }

}