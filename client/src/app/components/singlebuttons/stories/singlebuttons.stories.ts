import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import type { Story, Meta } from '@storybook/angular';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';

import { SinglebuttonsComponent } from "/workspaces/tree-visualizer/client/src/app/components/singlebuttons/singlebuttons.component";

export default {
  title: 'Components/SingleButtons',
  component: SinglebuttonsComponent,
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        MatButtonModule,
        BrowserAnimationsModule],
    }),
  ],
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/angular/configure/story-layout
    layout: 'fullscreen',
  },
} as Meta;

const Template: Story<SinglebuttonsComponent> = (args: SinglebuttonsComponent) => ({
  props: args,
});

export const Version1 = Template.bind({});
Version1.args = {};