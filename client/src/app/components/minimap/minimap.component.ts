import { Component, Input } from "@angular/core"
import * as go from "gojs"

const $ = go.GraphObject.make

@Component({
    selector: "app-minimap",
    templateUrl: "./minimap.component.html",
    styleUrls: ["./minimap.component.sass"],
})
export class MinimapComponent {
    @Input() public observedDiagram: go.Diagram | null = null
    private overview: go.Overview | null = null

    public ngAfterViewInit(): void {
        this.overview = $(go.Overview, "app-minimap", {
            observed: this.observedDiagram,
        })
    }
}
