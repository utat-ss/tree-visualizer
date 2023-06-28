import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core"
import * as go from "gojs"

const $ = go.GraphObject.make

@Component({
  selector: 'app-node-directory',
  templateUrl: './node-directory.component.html',
  styleUrls: ['./node-directory.component.sass']
})
export class NodeDirectoryComponent implements OnInit {
  public diagram: go.Diagram = new go.Diagram()
  public _selectedNode: go.Node | null = null;
  public newColor = "red";

  public node_found: go.Node | null = null;

  @Input()
  public model: go.TreeModel = new go.TreeModel()

  @Input()
  get selectedNode() { return this._selectedNode; }
  set selectedNode(node: go.Node | null) {
    if (node && node != null) {
      this._selectedNode = node;
      console.log('Node clicked:')
      console.log(this._selectedNode.data.title)
      this.diagram.startTransaction("changeColor");
      this.diagram.model.setDataProperty(this._selectedNode.data, "background", this.newColor);
      this.diagram.commitTransaction("changeColor");

      this.node_found = this.diagram.findNodeForKey(this._selectedNode.data.id)
      console.log('Looking for node')
      if (this.node_found !== null) {
        // Node found, you can access and manipulate it here
        // For example, you can change its color
        console.log('Node found:')
        console.log(this.node_found.data.title)
        this.node_found.data.fill = "red";
        this.diagram.startTransaction('changeColor')
        this.node_found.data.ButtonBorder = "red";
        this.diagram.model.setDataProperty(this.node_found.data, 'color', 'red')
        this.diagram.commitTransaction('changeColor')
      } else {
        // Node not found
        console.log("Node not found");
      }
    } else {
      this._selectedNode = null;
    }
  }

  /*@Output()
  public nodeClicked = new EventEmitter()*/

  constructor() {}

  public ngOnInit() {}

  public ngAfterViewInit(): void {

      console.log(this.selectedNode)
      console.log('hii')

      this.diagram = $(go.Diagram, "app-node-directory",
      {
        allowMove: false,
        allowCopy: false,
        allowDelete: false,
        allowHorizontalScroll: true,
        allowVerticalScroll: true,
        contentAlignment: go.Spot.TopLeft,
        padding: new go.Margin(75, 0, 0, 0),
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
      $(go.Node, 
      $("TreeExpanderButton",
        { // customize the button's appearance
          "_treeExpandedFigure": "LineDown",
          "_treeCollapsedFigure": "LineRight",
          "ButtonBorder.fill": "whitesmoke",
          "ButtonBorder.stroke": null,
          "_buttonFillOver": "rgba(0,128,255,0.25)",
          "_buttonStrokeOver": null
        }),
      $(go.Panel, "Horizontal",
        { position: new go.Point(18, 0) },
        new go.Binding("background", "isSelected", s => s ? "lightblue" : "white").ofObject(),
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
          { font: '9pt Verdana, sans-serif' },
          new go.Binding("text", "title", s => "" + s))
      )  // end Horizontal Panel
    );  // end Node

  this.diagram.linkTemplate = $(go.Link)

  this.diagram.model = this.model;

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