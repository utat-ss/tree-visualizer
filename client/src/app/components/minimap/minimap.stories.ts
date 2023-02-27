import { Meta, Story } from "@storybook/angular"
import { MinimapComponent } from "./minimap.component"

export default {
    component: MinimapComponent,
} as Meta

const Template: Story = (args) => ({
    props: args,
})

export const Default = Template.bind({})
Default.args = {}
