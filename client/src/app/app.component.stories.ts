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

// Node data array
const nodeDataArray = [
    {
        key: "ff5892a7-b5c9-4a25-97bd-663b2cff5bd7",
        title: "UTAT-Team-B",
        qualifier: "SHALL",
        type: "Performance",
        description: "A description",
        rationale: "A rationale",
        url: "https://www.notion.so/UTAT-Team-A-74331bc1129c417c850a0a5ca0deb759",
    },
    {
        key: "123456789",
        title: "UTAT-Team-A",
        qualifier: "SHOULD",
        type: "Constraint",
        description: "Another description",
        rationale: "A rationale",
        url: "https://www.notion.so/Child-1-123456789",
        parent: "ff5892a7-b5c9-4a25-97bd-663b2cff5bd7",
    },
    {
        key: "abcdefghi",
        title: "UTAT-Team-C",
        qualifier: "SHALL",
        type: "Component Selection",
        description: "A very long form description...",
        rationale: "A rationale",
        url: "https://www.notion.so/Child-2-abcdefghi",
        parent: "ff5892a7-b5c9-4a25-97bd-663b2cff5bd7",
    },
    {
        key: "qwertyuiop",
        title: "UTAT-Team-D",
        qualifier: "SHOULD",
        type: "A type",
        description: "Yet another description...",
        rationale: "A rationale",
        url: "https://www.notion.so/Grandchild-1-qwertyuiop",
        parent: "123456789",
    },
]

// Link data array
const linkDataArray = [
    {
        from: "ff5892a7-b5c9-4a25-97bd-663b2cff5bd7",
        to: "123456789",
    },
    {
        from: "ff5892a7-b5c9-4a25-97bd-663b2cff5bd7",
        to: "abcdefghi",
    },
    {
        from: "123456789",
        to: "qwertyuiop",
    },
    {
        from: "ff5892a7-b5c9-4a25-97bd-663b2cff5bd7",
        to: "qwertyuiop",
    },
]

export const Default = Template.bind({})
Default.args = {
    model: new go.GraphLinksModel(nodeDataArray, linkDataArray),
}

export const Cycle = Template.bind({})
Cycle.args = {
    model: new go.GraphLinksModel({
        nodeKeyProperty: "id",
        nodeDataArray: [
            {
                id: "A",
                parent: "C",
                title: "UTAT-Team-A",
                qualifier: "SHALL",
                type: "Performance",
                description: "A description",
                rationale: "A rationale",
                url: "https://www.notion.so/UTAT-Team-A-74331bc1129c417c850a0a5ca0deb759",
            },
            {
                id: "B",
                parent: "A",
                title: "UTAT-Team-B",
                qualifier: "SHOULD",
                type: "Constraint",
                description: "Another description",
                rationale: "A rationale",
                url: "https://www.notion.so/Child-1-123456789",
            },
            {
                id: "C",
                parent: "B",
                title: "UTAT-Team-C",
                qualifier: "SHALL",
                type: "Component Selection",
                description:
                    "A very long form description that may or may not exceed the width of the node. The quick brown fox jumps over the lazy dog. Octopuses have several tentacles. Icecream is cold. Did you know that lava is warm? Lava cake with an ice cream scoop on the side is delicious.",
                rationale: "A rationale",
                url: "https://www.notion.so/Child-2-abcdefghi",
            },
        ],
    }),
}
