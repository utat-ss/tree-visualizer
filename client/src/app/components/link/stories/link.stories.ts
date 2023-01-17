import { CommonModule } from '@angular/common';
import { moduleMetadata } from '@storybook/angular';
import { Story } from '@storybook/angular/types-6-0';
import { LinkComponent } from '../link.component';

export default {
  title: 'Components/Link',
  component: LinkComponent,
  decorators: [
    moduleMetadata({
      declarations: [LinkComponent],
      imports: [CommonModule],
    }),
  ],
};

const Template: Story<LinkComponent> = () => ({
  component: LinkComponent,
  props: {
    color: 'primary',
    content: 'Requirements Writing Guidelines',
    href: 'https://www.notion.so/utat-ss/Requirements-Writing-a034365a83d94f02923c98b9173e5916',
    target: '_blank',
  },
  template: `
    <app-link
      [color]="color"
      [href]="href"
      [target]="target"
    >
      {{ content }}
    </app-link>`,
});
export const Base = Template.bind({});