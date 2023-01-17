import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import type { Story, Meta } from '@storybook/angular';

import AppheaderComponent from "../appheader.component"

export default {
  title: 'Components/AppHeader',
  component: AppheaderComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule],
    }),
  ],
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/angular/configure/story-layout
    layout: 'fullscreen',
  },
} as Meta;

const Template: Story<AppheaderComponent> = (args: AppheaderComponent) => ({
  props: args,
});

export const Version1 = Template.bind({});
Version1.args = {};