import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'storybook-header',
  templateUrl: './appheader.component.html',
  styleUrls: ['./appheader.component.scss'],
})
export default class AppheaderComponent {
  database_title = 'Requirements';
  number_of_nodes = 50;
  number_of_warnings = 0;
  panelOpenState = false;
}
