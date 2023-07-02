import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectorComponent } from './inspector.component';
import { GojsAngularModule } from 'gojs-angular';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('InspectorComponent', () => {
  let component: InspectorComponent;
  let fixture: ComponentFixture<InspectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        GojsAngularModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        NoopAnimationsModule    // don't care about animations for now
      ],
      declarations: [ InspectorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InspectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();

    let elem = document.evaluate('//mat-label', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    expect(elem).not.toBeNull();
  });

  // Runs these tests on each of the properties we need to display
  describe.each([
    ['Requirement', 'input'],
    ['Parent', 'input'],
    ['Qualifier', 'mat-select'],
    ['Collection', 'input'],
    ['Verification Plans', 'input'],
    ['System', 'input'],
    ['Rationale', 'input'],
    ['Trades', 'input'],
    ['Stakeholders', 'input'],
    ['Mission', 'input'],
    ['Description', 'input']
  ])('form field %s', (field: string, type: string) => {
    let document: Document;
    let elem: Node | null;

    // Helper function to avoid having to repeat XPath query boilerplate
    const getOne = (query: string, doc: Document): Node | null => {
      return doc.evaluate(query, doc, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    }

    beforeEach(async () => {
      document = (fixture.nativeElement as HTMLElement).ownerDocument;
      elem = getOne(`//mat-label[text()='${field}']`, document);
    });

    it('should exist', () => {
      expect(elem).not.toBeNull();
    });

    it('should be in a mat-form-field', () => {
      expect(getOne(`//mat-label[text()='${field}']/ancestor::mat-form-field`, document)).not.toBeNull();
    });

    it('should have an input element sibling', () => {
      expect(getOne(`//mat-label[text()='${field}']/ancestor::mat-form-field/descendant::${type}`, document)).not.toBeNull();
    })
  });
});
