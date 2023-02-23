import { Meta, Story } from '@storybook/angular';
import { OrgChartComponent } from './org-chart.component';
import { action } from '@storybook/addon-actions';
import * as go from 'gojs';

export default {
    component: OrgChartComponent,
} as Meta;

const Template: Story = (args) => ({
    props: args,
});

const model = new go.TreeModel([
    { key: 1, name: 'Alpha', parent: '' },
    { key: 2, name: 'Beta', parent: 1 },
    { key: 3, name: 'Gamma', parent: 1 },
    { key: 4, name: 'Delta', parent: 2 },
    { key: 5, name: 'Epsilon', parent: 2 },
]);

export const FirstStory = Template.bind({});
FirstStory.args = {
    model,
    nodeClicked: action('nodeClicked'),
};
