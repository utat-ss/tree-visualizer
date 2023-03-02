import { MatNativeDateModule } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { Meta, moduleMetadata, Story } from "@storybook/angular";
import { InspectorComponent } from "./inspector.component";

export default {
    component: InspectorComponent,
    decorators: [
        moduleMetadata({
            imports: [MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule]
        })
    ]
} as Meta;

const Template: Story<InspectorComponent> = (args: InspectorComponent) => ({
    props: args,
});

export const One = Template.bind({})
One.args = {
    requirement: 'Hello!',
};

export const Two = Template.bind({})
Two.args = {
    requirement: 'Bye!',
};
