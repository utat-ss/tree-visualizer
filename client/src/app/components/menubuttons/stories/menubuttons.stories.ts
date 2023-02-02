import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import type { Story, Meta } from '@storybook/angular';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatMenuModule} from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

import { MenubuttonsComponent } from "/workspaces/tree-visualizer/client/src/app/components/menubuttons/menubuttons.component";

export default {
  title: 'Components/MenuButtons',
  component: MenubuttonsComponent,
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        MatMenuModule,
        MatButtonModule,
        BrowserAnimationsModule],
    }),
  ],
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/angular/configure/story-layout
    layout: 'fullscreen',
  },
} as Meta;

const Template: Story<MenubuttonsComponent> = (args: MenubuttonsComponent) => ({
  props: args,
});

export const Version1 = Template.bind({});
Version1.args = {};