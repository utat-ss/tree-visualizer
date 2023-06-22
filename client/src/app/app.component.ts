import { Component } from "@angular/core"
import * as go from "gojs"
import { BackendService, Requirements } from "./services/backend.service"

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.sass"],
})
export class AppComponent {
    title = "tree-visualizer"

    model: go.TreeModel | null = null

    public selectedNode: go.Part | null = null

    constructor(private backend: BackendService) {};

    ngOnInit(): void {
        // Fire HTTML req and set callback
        this.backend.getRequirements().subscribe(this.buildTreeModel);
    }

    buildTreeModel(r: Requirements) {
        this.model = new go.TreeModel({
            nodeKeyProperty: "id",
            nodeDataArray: [ r.nodes ]
        })
    }

    public setSelectedNode(node: go.Part | null) {
        this.selectedNode = node
    }
}
