import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from "@angular/core"
import { FormsModule } from '@angular/forms';
import * as go from "gojs"

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
  public searchText: string = '';
  public currentSearchIndex: number | null = null;
  public hasMatchingNodes: boolean = true; // Initialize as true

  @Input()
  public model: go.GraphLinksModel = new go.GraphLinksModel()

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
          $(go.GridLayout,
            {
              wrappingColumn: 1,
              spacing: new go.Size(0, 5)
            })
      });

    // define the Node template
    this.diagram.nodeTemplate =
      $(go.Node, {
        selectionAdorned: false,
      },
      $(go.Panel, "Horizontal",
        { 
          position: new go.Point(18, 0),
        },
        $(go.Picture,
          {
            width: 10, height: 10,
            margin: new go.Margin(0, 0, 0, 0),
            imageStretch: go.GraphObject.Uniform
          },
          // bind the picture source on two properties of the Node
          // to display open folder, closed folder, or document
          new go.Binding("source", "", imageConverter).ofObject(),),
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
  function imageConverter() {
    return "https://cdn-icons-png.flaticon.com/512/1635/1635634.png";
  }

  window.addEventListener('DOMContentLoaded', this.ngAfterViewInit);
  }

  // Function to handle the search operation
  searchNodes() {
    const searchText = this.searchText.toLowerCase(); // Convert the search text to lowercase for case-insensitive search
    this.diagram.startTransaction("search"); // Start a transaction for making changes

    const matchingNodes: go.Node[] = []; // To store matching nodes
    let selectedNode: go.Node | null = null; // To store the selected node

    this.diagram.nodes.each((node) => {
      const nodeData = node.data;
      const title = nodeData.title.toLowerCase(); // Convert node title to lowercase

      if (title.includes(searchText)) {
        matchingNodes.push(node);

        // If the node matches the search text and no node is currently selected, select it
        if (!selectedNode) {
          selectedNode = node;
        }
      }
    });

    this.diagram.commitTransaction("search"); // Commit the transaction to apply changes

    // If a node matching the search text was found, select it
    if (selectedNode) {
      this.selectedNode = selectedNode; // Assign the selected node
    }

    // Update the currentSearchIndex based on the matching nodes
    if (matchingNodes.length > 0) {
      if (this.currentSearchIndex === null || this.currentSearchIndex >= matchingNodes.length - 1) {
        this.currentSearchIndex = 0; // Start from the first matching node
      } else {
        this.currentSearchIndex++; // Move to the next matching node
      }
      this.selectedNode = matchingNodes[this.currentSearchIndex];
    }

    this.hasMatchingNodes = matchingNodes.length > 0;
  }

  // Function to clear the search
  clearSearch() {
    this.searchText = ''; // Clear the search text
    this.diagram.startTransaction("clearSearch");

    if (this.selectedNode) {
      this.selectedNode = null;
    }

    this.diagram.commitTransaction("clearSearch");

    this.currentSearchIndex = null;
  }

  // Function to handle keydown events on the input field
  onKeyDown(event: KeyboardEvent) {
    // Check if the Backspace key was pressed (keyCode 8)
    if (event.keyCode === 8) {
      this.currentSearchIndex = null; // Reset the search index
      this.hasMatchingNodes = true;
    }
  }
  }