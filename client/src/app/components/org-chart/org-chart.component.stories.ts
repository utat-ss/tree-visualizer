import { Meta, Story } from "@storybook/angular"
import { OrgChartComponent } from "./org-chart.component"
import { action } from "@storybook/addon-actions"
import * as go from "gojs"

export default {
    component: OrgChartComponent,
} as Meta

const Template: Story = (args) => ({
    props: args,
})

const model = new go.TreeModel({
    nodeKeyProperty: "id",
    nodeDataArray: [
        {
            id: "ff5892a7-b5c9-4a25-97bd-663b2cff5bd7",
            parent: "",
            title: "UTAT-Team-A",
            description: "A description",
            rationale: "A rationale",
            url: "https://www.notion.so/UTAT-Team-A-74331bc1129c417c850a0a5ca0deb759",
        },
        {
            id: "123456789",
            parent: "ff5892a7-b5c9-4a25-97bd-663b2cff5bd7",
            title: "UTAT-Team-B",
            description: "A description",
            rationale: "A rationale",
            url: "https://www.notion.so/Child-1-123456789",
        },
        {
            id: "abcdefghi",
            parent: "ff5892a7-b5c9-4a25-97bd-663b2cff5bd7",
            title: "UTAT-Team-C",
            description: "A description",
            rationale: "A rationale",
            url: "https://www.notion.so/Child-2-abcdefghi",
        },
        {
            id: "qwertyuiop",
            parent: "123456789",
            title: "UTAT-Team-D",
            description: "A description",
            rationale: "A rationale",
            url: "https://www.notion.so/Grandchild-1-qwertyuiop",
        },
    ],
})

export const FirstStory = Template.bind({})
FirstStory.args = {
    model,
    nodeClicked: action("nodeClicked"),
}
