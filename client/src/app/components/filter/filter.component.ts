import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import * as go from 'gojs'
import { Requirement } from 'src/app/interfaces/requirement';

@Component({
    selector: 'app-filter',
    templateUrl: './filter.component.html',
    styleUrls: ['./filter.component.sass']
})
export class FilterComponent {

    FilterComponent = FilterComponent;  // workaround to use static field in template

    @Input() public model = new go.GraphLinksModel();
    @Output() public filterUpdated = new EventEmitter<Array<string>>()

    static readonly validFilters: Array<string> = [
        'created-by',
        // 'parent',       // TODO: pending ID -> title translation
        // 'last-edited',  // TODO: have a datepicker for this
        'qualifier',
        'collection',
        'verification-plans',
        'verification-methods',
        'system',
        'stakeholder',
        'mission',
    ];

    activeFilters: Map<string, string> = new Map();         // note: only allows for string values
    numResults: number = -1;

    // Form input handling
    filteredValidFilters: Array<string> = FilterComponent.validFilters;
    selectedFilter: string = '';

    validValues: Set<string> = new Set();
    filteredValidValues: Set<string> = new Set();
    selectedValue: string = '';

    filterValidFilters() {
        this.filteredValidFilters = FilterComponent.validFilters.filter(item => item.includes(this.selectedFilter));
    }

    setValidValues() {
        // ! looking through model every time isn't efficient, look into optimizing

        if (FilterComponent.validFilters.includes(this.selectedFilter)) {   // guard against manual invalid input
            let requirements = this.model.nodeDataArray;

            // clear first
            this.validValues.clear();

            // enumerate categories by looking through requirements
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

    // filter helper function
    private runFilter(): Array<string> {
        let requirements = this.model.nodeDataArray;
        this.activeFilters.forEach((filterForValue, field) => {
            // apply each filter sequentially
            requirements = requirements.filter(requirement => {
                let value: Array<string> | string = requirement[field];
                console.log("filtering " + requirement + " for field " + field + " for value " + filterForValue);

                // check that it either equals or is element in array (some fields are arrays)
                return value == filterForValue || (Array.isArray(value) && value.includes(filterForValue));
            })
        });

        this.numResults = requirements.length;

        return (requirements as Array<Requirement>).map(r => r.id);
    }

    // add filters
    // TODO: more efficient
    addFilter(field: string, val: string) {
        if (!FilterComponent.validFilters.includes(field)) {
            throw new Error('FilterComponent: tried to add invalid filter ' + field);
        }

        this.activeFilters.set(field, val);

        this.filterUpdated.emit(this.runFilter())
    }

    // remove filters
    // TODO: more efficient
    removeFilter(field: string) {
        this.activeFilters.delete(field);

        this.filterUpdated.emit(this.runFilter());
    }

    filterClicked() {
        this.addFilter(this.selectedFilter, this.selectedValue);
        this.selectedFilter = '';
        this.selectedValue = '';
    }

}
