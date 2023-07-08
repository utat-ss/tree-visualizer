import { Component, Input } from '@angular/core';
import * as go from 'gojs'

import { Requirements } from 'src/app/interfaces/requirements';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.sass']
})
export class FilterComponent {

  FilterComponent = FilterComponent;  // workaround to use static field in template

  @Input()
  public model: go.TreeModel = new go.TreeModel();

  static readonly validFilters: Array<string> = [
    'stakeholder',
    'system',
    'collection'
  ];

  filteredValidFilters: Array<string> = FilterComponent.validFilters;
  selectedFilter: string = '';

  validValues: Set<string> = new Set();
  filteredValidValues: Set<string> = new Set();
  selectedValue: string = '';

  activeFilters: Map<string, string> = new Map();   // note: only allows for string values

  filterValidFilters() {
    this.filteredValidFilters = FilterComponent.validFilters.filter(item => item.includes(this.selectedFilter));
  }

  setValidValues() {
    // ! looking through model every time isn't efficient, look into optimizing

    if (FilterComponent.validFilters.includes(this.selectedFilter)) {   // guard against manual invalid input
      let requirements = this.model.nodeDataArray;

      // clear first
      this.validValues.clear();

      requirements.forEach((requirement) => {
        let value = requirement[this.selectedFilter];

        if (Array.isArray(value)) for (let v of value) this.validValues.add(v);   // some fields are arrays
        else this.validValues.add(requirement[this.selectedFilter]);
      });

      // more reset
      this.selectedValue = '';
      this.filteredValidValues = new Set(this.validValues);
    }
  }

  filterValidValues() {
    // seems to need to convert to Array then back to Set to use filter
    this.filteredValidValues = new Set([...this.validValues].filter(item => item.includes(this.selectedValue)));
  }

  // add filters: apply on top
  addFilter(field: string, val: string) {
    if (!FilterComponent.validFilters.includes(field)) {
      throw new Error('FilterComponent: tried to add invalid filter ' + field);
    }

    this.activeFilters.set(field, val);

    // TODO: load filter here
  }

  // remove filters: reset then reapply
  // TODO: more efficient
  removeFilter(field: string) {
    this.activeFilters.delete(field);

    // TODO: unload and reload all filters here
  }

}
