import { Meta, moduleMetadata, Story } from "@storybook/angular"
import { AppComponent } from "./app.component"
import { CommonModule } from "@angular/common"
import { HttpClientModule } from "@angular/common/http"
import { action } from "@storybook/addon-actions"
import * as go from "gojs"

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { NodeDirectoryComponent } from "./components/node-directory/node-directory.component"
import { OrgChartComponent } from "./components/org-chart/org-chart.component"
import { InspectorComponent } from "./components/inspector/inspector.component"

export default {
    component: AppComponent,
    parameters: {
        layout: 'fullscreen',
    },
    decorators: [
        moduleMetadata({
            declarations: [NodeDirectoryComponent, OrgChartComponent, InspectorComponent],
            imports: [CommonModule, HttpClientModule, MatFormFieldModule, MatInputModule, MatSelectModule],
        }),
    ],
} as Meta

const Template: Story = (args) => ({
    props: args,
})

const model: go.TreeModel = new go.TreeModel({
    nodeKeyProperty: "id",
    nodeDataArray: [
        {
            id: "ff5892a7-b5c9-4a25-97bd-663b2cff5bd7",
            parent: "",
            title: "UTAT-Team-A",
            qualifier: "SHALL",
            type: "Performance",
            description: "A description",
            rationale: "A rationale",
            url: "https://www.notion.so/UTAT-Team-A-74331bc1129c417c850a0a5ca0deb759",
        },
        {
            id: "123456789",
            parent: "ff5892a7-b5c9-4a25-97bd-663b2cff5bd7",
            title: "UTAT-Team-B",
            qualifier: "SHOULD",
            type: "Constraint",
            description: "Another description",
            rationale: "A rationale",
            url: "https://www.notion.so/Child-1-123456789",
        },
        {
            id: "abcdefghi",
            parent: "ff5892a7-b5c9-4a25-97bd-663b2cff5bd7",
            title: "UTAT-Team-C",
            qualifier: "SHALL",
            type: "Component Selection",
            description:
                "A very long form description that may or may not exceed the width of the node. The quick brown fox jumps over the lazy dog. Octopuses have several tentacles. Icecream is cold. Did you know that lava is warm? Lava cake with an ice cream scoop on the side is delicious.",
            rationale: "A rationale",
            url: "https://www.notion.so/Child-2-abcdefghi",
        },
        {
            id: "qwertyuiop",
            parent: "123456789",
            title: "UTAT-Team-D",
            qualifier: "SHOULD",
            type: "A type",
            description: "Yet another description that is just a little bit longer",
            rationale: "A rationale",
            url: "https://www.notion.so/Grandchild-1-qwertyuiop",
        },
    ],
  });

  export const Default = Template.bind({})
  Default.args = {
      model,
      nodeClicked: action("nodeClicked"),
  }
