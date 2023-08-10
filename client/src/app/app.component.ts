import { Component, Input } from "@angular/core"
import * as go from "gojs"
import { Requirements } from "./interfaces/requirements"
import { BackendService } from "./services/backend.service"

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.sass"],
})
export class AppComponent {
    title = "tree-visualizer"

    @Input()
    public selectedNode: go.Node | null = null

    @Input()
    model = new go.GraphLinksModel({
        nodeDataArray: [],
        linkDataArray: [],
    })

    constructor(private backend: BackendService) {
        backend.getRequirements().subscribe((r) => this.initModel(r))
    }

    initModel(r: Requirements) {
        this.model.commit(m => m.mergeNodeDataArray(r))   // ! currently broken due to multiple parents, fix when moved to non-TreeModel!
    }

    public setSelectedNode(node: go.Node) {
        this.selectedNode = node
        console.log(this.selectedNode)
    }
}
