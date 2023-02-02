import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import type { Story, Meta } from '@storybook/angular';

import { MatExpansionModule } from '@angular/material/expansion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ExpansionpanelComponent } from "/workspaces/tree-visualizer/client/src/app/components/expansionpanel/expansionpanel.component";

export default {
  title: 'Components/ExpansionPanel',
  component: ExpansionpanelComponent,
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        MatExpansionModule,
        BrowserAnimationsModule],
    }),
  ],
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/angular/configure/story-layout
    layout: 'fullscreen',
  },
} as Meta;

const Template: Story<ExpansionpanelComponent> = (args: ExpansionpanelComponent) => ({
  props: args,
});

export const Version1 = Template.bind({});
Version1.args = {};