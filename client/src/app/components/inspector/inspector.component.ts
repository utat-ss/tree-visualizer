import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Requirement } from 'src/app/interfaces/requirement';

@Component({
    selector: 'app-inspector',
    templateUrl: './inspector.component.html',
    styleUrls: ['./inspector.component.sass']
})
export class InspectorComponent implements OnChanges {
    @Input() public selectedNode: go.Part | null = null;

    read_only = true;
    qualifiers = ['SHALL', 'SHOULD', 'WILL'];

    requirement: string = 'FINCH-TreeVisualizer-Placeholder';
    created_by: string = 'John Doe';
    parent: string = 'FINCH-Team-Placeholder';
    last_edited: Date | null = new Date();
    qualifier: string = 'SHALL';
    collection: string = 'Tree visualizer';
    test_plans: string[] = ['Test plan 1 (placeholder link)'];
    system: string = 'Tree Visualizer';
    rationale: string = 'To do stuff';
    trades: string[] = ['Trade 1 (placeholder link)'];
    last_edited_by: string = 'Jane Doe';
    stakeholders: string[] = ['Systems'];
    mission: string = 'FINCH';
    description: string = 'The tree visualizer shall do things'
    url: URL | null = new URL('https://www.notion.so/FINCH-Power-Batteries-74331bc1129c417c850a0a5ca0deb759')

    ngOnChanges(changes: SimpleChanges) {
        const val = changes['selectedNode'].currentValue;

        if (val === null) {
            this.requirement = '-';
            this.created_by = '-';
            this.parent = '-';
            this.last_edited = null;
            this.qualifier = '-';
            this.collection = '-';
            this.test_plans = ['-'];
            this.system = '-';
            this.rationale = '-';
            this.trades = ['-'];
            this.last_edited_by = '-';
            this.stakeholders = ['-'];
            this.mission = '-';
            this.description = '-';
            this.url = null;
        }
        else {
            const data: Requirement = val.data;
            const parent: go.Node | null = val.findTreeParentNode();

            this.requirement = data.title;
            this.created_by = data['created-by'];
            this.parent = parent ? parent.data.title : '';
            this.last_edited = new Date(data['last-edited']);
            this.qualifier = data.qualifier;
            this.collection = data.collection.join(', ');
            this.test_plans = data['test-plans'].length > 0 ? data['test-plans'] : [''];
            this.system = data.system;
            this.rationale = data.rationale;
            this.trades = data.trades.length > 0 ? data.trades : [''];
            this.last_edited_by = data['last-edited-by'];
            this.stakeholders = data.stakeholder.length > 0 ? data.stakeholder : [''];
            this.mission = data.mission;
            this.description = data.description;
            this.url = data.url ? new URL(data.url) : null;
        }
    }
}
