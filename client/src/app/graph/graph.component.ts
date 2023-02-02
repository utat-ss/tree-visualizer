import { Component, OnInit } from '@angular/core';
import { DataSet, Network } from 'vis-network/standalone';

import { BackendService, Requirements } from '../services/backend.service'

// import { VisNetworkService, Data, DataSet, Node, Edge, Options } from 'ngx-vis';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.sass']
})

export class GraphComponent implements OnInit {
  data: string = "asdfasdfadsf";
  raw: string | undefined;
  requirements: Requirements | undefined;

  constructor(private backend: BackendService) {};

  showGraph(r: Requirements) {
    console.log(r.nodes.length + " nodes and " + r.edges.length + " edges loaded!");

    // create datasets
    const nodes = new DataSet(r.nodes);
    const edges = new DataSet(r.edges);

    const container: any = document.getElementById('graph');

    const data = {
      nodes: nodes,
      edges: edges,
    };

    const options = {
      edges: {
        arrows: {
          to: {
            enabled: true
          }
        },
        width: 3,
        hoverWidth: 3,
        selectionWidth: 6
      },
      nodes: {
        shape: 'circle',
        mass: 5,
        widthConstraint: {
          maximum: 180
        },
        font: {
          size: 30
        },
        shadow: {
          enabled: true
        }
      },
      layout: {
        hierarchical: {
          enabled: false,
          nodeSpacing: 500,
          levelSeparation: 500,
          sortMethod: 'directed'
        }
      },
      interaction: {
        hover: true
      }
    };

    const network = new Network(container, data, options);
  }

  ngOnInit(): void {
    this.backend.getRequirements().subscribe(this.showGraph);
  }

  /*
  network: string = 'graph';
  data: Data;
  nodes: DataSet<Node>;
  edges: DataSet<Edge>;
  options: Options;

  constructor(private service: VisNetworkService) {}
  
  ngOnInit(): void {
    this.nodes = new DataSet<Node>([
      { id: '1', label: 'Node 1' },
    ]);

    this.edges = new DataSet<Edge>([

    ]);

    this.data = {
      nodes: this.nodes,
      edges: this.edges
    };

    // create an array with nodes
    var nodes = new DataSet(JSON.parse("#{nodes}".replaceAll("&quot;", "\"").replaceAll("&amp;", "&")));

    // create an array with edges
    var edges = new DataSet(JSON.parse("#{edges}".replaceAll("&quot;", "\"")));

    // create a network
    const container = this.elem?.nativeElement;

    // provide the data in the vis format
    var data = {
        nodes: nodes,
        edges: edges
    };
    
    this.options = {
      edges: {
        arrows: {
          to: {
            enabled: true
          }
        },
        width: 3,
        hoverWidth: 3,
        selectionWidth: 6
      },
      nodes: {
        shape: 'circle',
        mass: 5,
        widthConstraint: {
          maximum: 180
        },
        font: {
          size: 30
        },
        shadow: true
      },
      layout: {
        improvedLayout: false
      },
      interaction: {
        hover: true
      }
    };

    // initialize your network!
    // var network = new Network(container, data, options);
  }*/
}
