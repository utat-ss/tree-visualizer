import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Link } from 'gojs';
import { Requirement } from 'src/app/interfaces/requirement';

@Component({
    selector: 'app-inspector',
    templateUrl: './inspector.component.html',
    styleUrls: ['./inspector.component.sass']
})
export class InspectorComponent implements OnChanges {
    @Input() public selectedNode: go.Part | null = null;

    read_only = true;
    qualifiers = ['SHALL', 'SHOULD', 'WILL', 'MAY'];

    requirement: string = 'FINCH-TreeVisualizer-Placeholder';
    created_by: string = 'John Doe';
    parents: string[] = ['FINCH-Team-Placeholder1', 'FINCH-Team-Placeholder2'];
    last_edited: Date | null = new Date();
    qualifier: string = 'SHALL';
    collection: string = 'Tree visualizer';
    verification_plans: string[] = ['Test plan 1 (placeholder link)'];
    verification_methods: string[] = ['Test'];
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
            this.parents = ['-'];
            this.last_edited = null;
            this.qualifier = '-';
            this.collection = '-';
            this.verification_plans = ['-'];
            this.verification_methods = ['-'];
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
            const parents: Array<go.Node> = [];

            let linksIterator = val.findLinksInto()
            while (linksIterator.next()) {
                parents.push((linksIterator.value as Link).fromNode!);
            }

            this.requirement = data.title;
            this.created_by = data['created-by'];
            this.parents = parents.map(node => node.data.title);
            this.last_edited = new Date(data['last-edited']);
            this.qualifier = data.qualifier;
            this.collection = data.collection;
            this.verification_plans = data['verification-plans'].length > 0 ? data['verification-plans'] : [''];
            this.verification_methods = data['verification-methods'].length > 0 ? data['verification-methods'] : [''];
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
