import { Component } from "@angular/core"
import * as go from "gojs"
import { Requirements } from "./interfaces/requirements"
import { BackendService } from "./services/backend.service";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.sass"],
})
export class AppComponent {
    title = "tree-visualizer";

    public selectedNode: go.Part | null = null;
    model = new go.TreeModel({
        nodeKeyProperty: "id",
        nodeDataArray: [],
    });

    constructor(private backend: BackendService) {
        backend.getRequirements().subscribe(r => this.initModel(r))
    };

    initModel(r: Requirements) {
        this.model.commit(m => m.mergeNodeDataArray(r))
    }

    public setSelectedNode(node: go.Part | null) {
        this.selectedNode = node
    }
}
