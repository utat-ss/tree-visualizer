import { Component, Input } from "@angular/core"
import * as go from "gojs"
import { RequirementsGraph } from "./interfaces/requirements-graph"
import { BackendService } from "./services/backend.service"

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.sass"],
})
export class AppComponent {
    title = "tree-visualizer"

    @Input()
    public visibleList: Array<string> = []

    @Input()
    public selectedNode: go.Node | null = null

    @Input()
    model = new go.GraphLinksModel({
        nodeKeyProperty: "id",
        linkKeyProperty: "id",
        nodeDataArray: [],
        linkDataArray: [],
    });

    constructor(private backend: BackendService) {
        backend.getRequirementsGraph().subscribe((graph) => this.initModel(graph))
    }

    initModel(graph: RequirementsGraph) {
        const sortedNodes = graph.nodes.slice().sort((a, b) => {
            return a.title.localeCompare(b.title);
        });
        this.model.commit(m => m.mergeNodeDataArray(sortedNodes));
        this.model.commit(m => (m as go.GraphLinksModel).mergeLinkDataArray(graph.links));
    }

    public setSelectedNode(node: go.Node) {
        this.selectedNode = node;
        console.log(this.selectedNode);
    }

    public setVisibleList(visibleList: Array<string>) {
        this.visibleList = visibleList;
        console.log(visibleList)
    }
}
