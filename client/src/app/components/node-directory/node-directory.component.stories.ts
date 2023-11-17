import { Meta, Story } from "@storybook/angular"
import { NodeDirectoryComponent } from "./node-directory.component"
import { action } from "@storybook/addon-actions"
import * as go from "gojs"

export default {
    component: NodeDirectoryComponent,
} as Meta

const Template: Story = (args) => ({
    props: args,
})

// Node data array
const nodeDataArray = [
    {
        key: "ff5892a7-b5c9-4a25-97bd-663b2cff5bd7",
        title: "UTAT-Team-A",
        qualifier: "SHALL",
        type: "Performance",
        description: "A description",
        rationale: "A rationale",
        url: "https://www.notion.so/UTAT-Team-A-74331bc1129c417c850a0a5ca0deb759",
    },
    {
        key: "123456789",
        title: "UTAT-Team-B",
        qualifier: "SHOULD",
        type: "Constraint",
        description: "Another description",
        rationale: "A rationale",
        url: "https://www.notion.so/Child-1-123456789",
    },
    {
        key: "abcdefghi",
        title: "UTAT-Team-C",
        qualifier: "SHALL",
        type: "Component Selection",
        description: "A very long form description...",
        rationale: "A rationale",
        url: "https://www.notion.so/Child-2-abcdefghi",
    },
    {
        key: "qwertyuiop",
        title: "UTAT-Team-D",
        qualifier: "SHOULD",
        type: "A type",
        description: "Yet another description...",
        rationale: "A rationale",
        url: "https://www.notion.so/Grandchild-1-qwertyuiop",
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