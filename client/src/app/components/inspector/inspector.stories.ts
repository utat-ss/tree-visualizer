import { Meta, moduleMetadata, Story } from "@storybook/angular";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { InspectorComponent } from "./inspector.component";

export default {
    component: InspectorComponent,
    decorators: [
        moduleMetadata({
            imports: [MatFormFieldModule, MatInputModule, MatSelectModule]
        })
    ]
} as Meta;

const Template: Story<InspectorComponent> = (args: InspectorComponent) => ({
    props: args,
});

export const Readonly = Template.bind({})
Readonly.args = {
    read_only: true,
};

export const Editable = Template.bind({})
Editable.args = {
    read_only: false,
}; 
