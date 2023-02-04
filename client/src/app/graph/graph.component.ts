import { Component, OnInit } from '@angular/core';
import { DataSet, Network } from 'vis-network/standalone';

import { BackendService, Requirements } from '../services/backend.service'

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.sass']
})

export class GraphComponent implements OnInit {

  constructor(private backend: BackendService) {};

  // Subscriber for HTTP req
  showGraph(r: Requirements) {
    // log
    console.log("GraphComponent: ", r.nodes.length + " nodes and " + r.edges.length + " edges loaded!");

    // create datasets
    const nodes = new DataSet(r.nodes);
    const edges = new DataSet(r.edges);

    const container = document.getElementById('graph')!;  // #graph div should always exist in template

    // TODO: put config options into config file
    // config
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

    // create network
    const network = new Network(container, data, options);
  }

  ngOnInit(): void {
    // Fire HTTML req and set callback
    this.backend.getRequirements().subscribe(this.showGraph);
  }

}
