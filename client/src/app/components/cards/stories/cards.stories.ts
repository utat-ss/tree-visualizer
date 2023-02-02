import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import type { Story, Meta } from '@storybook/angular';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';

import { CardsComponent } from "/workspaces/tree-visualizer/client/src/app/components/cards/cards.component";

export default {
  title: 'Components/Cards',
  component: CardsComponent,
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        BrowserAnimationsModule,
        MatCardModule,],
    }),
  ],
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/angular/configure/story-layout
    layout: 'fullscreen',
  },
} as Meta;

const Template: Story<CardsComponent> = (args: CardsComponent) => ({
  props: args,
});

export const Version1 = Template.bind({});
Version1.args = {};