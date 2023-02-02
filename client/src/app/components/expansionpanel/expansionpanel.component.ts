import { Component } from '@angular/core';

@Component({
  selector: 'app-expansionpanel',
  templateUrl: './expansionpanel.component.html',
  styleUrls: ['./expansionpanel.component.scss'],
})
export class ExpansionpanelComponent {
  database_title = 'Requirements';
  number_of_nodes = 50;
  number_of_warnings = 0;
  panelOpenState = false;
}
