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
var max = 49;
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


/*
const model: go.TreeModel = new go.TreeModel([
  { key: 1, name: 'TreeVisualizer'},
  { key: 2, name: 'NCRHandling', parent: 1 },
  { key: 3, name: 'SynchronousEdits', parent: 1 },
  { key: 4, name: 'WarnDuplicateID', parent: 2 },
  { key: 5, name: 'WarnCircularDependencies', parent: 2 },
  { key: 6, name: 'VPNAccess', parent: 1},
  { key: 7, name: 'VisualizeDatabase', parent: 3,},
  { key: 8, name: 'EditDatabase', parent: 3},
  { key: 9, name: 'SynchronousTeamwork', parent: 3},
  { key: 10, name: 'Payload'},
  { key: 11, name: 'SNR', parent: 10},
  { key: 12, name: 'SlitWidth', parent: 10}
]);*/

export const Default = Template.bind({})
Default.args = {
    model,
    nodeClicked: action("nodeClicked"),
}