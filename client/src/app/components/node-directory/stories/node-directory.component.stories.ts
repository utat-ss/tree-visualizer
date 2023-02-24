import { Meta, Story } from "@storybook/angular"
import { NodeDirectoryComponent } from "/workspaces/tree-visualizer/client/src/app/components/node-directory/node-directory.component"
import { action } from "@storybook/addon-actions"
import * as go from "gojs"

export default {
    component: NodeDirectoryComponent,
} as Meta

const Template: Story = (args) => ({
    props: args,
})

var nodeDataArray = [{ key: 0 }];
var max = 25;
var count = 0;
while (count < max) {
count = makeTree(3, count, max, nodeDataArray, nodeDataArray[0]);
}

function makeTree(level: number, count: number, max: number, nodeDataArray: { key: number }[] | { key: any; parent: any }[], parentdata: { key: any; parent?: any }) {
    var numchildren = Math.floor(Math.random() * 10);
    for (var i = 0; i < numchildren; i++) {
      if (count >= max) return count;
      count++;
      var childdata = { key: count, parent: parentdata.key };
      nodeDataArray.push(childdata);
      if (level > 0 && Math.random() > 0.5) {
        count = makeTree(level - 1, count, max, nodeDataArray, childdata);
      }
    }
    return count;
}

const model = new go.TreeModel(nodeDataArray)

export const Default = Template.bind({})
Default.args = {
    model,
    nodeClicked: action("nodeClicked"),
}