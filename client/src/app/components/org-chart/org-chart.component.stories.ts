import { Meta, Story } from '@storybook/angular';
import { OrgChartComponent } from './org-chart.component';

export default {
  component: OrgChartComponent,
} as Meta;

const Template: Story = (args) => ({
  props:args,
});

export const FirstStory = Template.bind({});
FirstStory.args= {

};