import { Component } from '@angular/core';

@Component({
  selector: 'app-inspector',
  templateUrl: './inspector.component.html',
  styleUrls: ['./inspector.component.sass']
})
export class InspectorComponent {
  read_only = true;
  qualifiers = ['SHALL', 'SHOULD'];
  types = ['Functional', 'Performance', 'Environmental', 'Constraint', 'Design Standard', 'Programmatic', 'Design', 'Interface', 'Mission Assurance'];
  verification_methods = ['Test', 'Analysis', 'Demonstration'];

  requirement: string = 'FINCH-TreeVisualizer-Placeholder';
  created_by: string = 'John Doe';
  parent: string = 'FINCH-Team-Placeholder';
  last_edited: Date = new Date();
  qualifier: string = 'SHALL';
  collection: string = 'Tree visualizer';
  type: string = 'Functional';
  verification_plans: string[] = ['Test plan 1 (placeholder link)'];
  verification_method: string = 'Demonstration';
  system: string = 'Tree Visualizer';
  rationale: string = 'To do stuff';
  trades: string[] = ['Trade 1 (placeholder link)'];
  last_edited_by: string = 'Jane Doe';
  stakeholders: string[] = ['Systems'];
  mission: string = 'FINCH';
  description: string = 'The tree visualizer shall do things'
  url: URL = new URL('https://www.notion.so/FINCH-Power-Batteries-74331bc1129c417c850a0a5ca0deb759')
}
