import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Mock, MockComponent } from 'ng-mocks';
import { AppComponent } from './app.component';
import { InspectorComponent } from './components/inspector/inspector.component';
import { NodeDirectoryComponent } from './components/node-directory/node-directory.component';
import { OrgChartComponent } from './components/org-chart/org-chart.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [
        AppComponent,
        MockComponent(InspectorComponent),
        MockComponent(NodeDirectoryComponent),
        MockComponent(OrgChartComponent)
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'tree-visualizer'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('tree-visualizer');
  });

  it.skip('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('#title')?.textContent).toContain('TreeVisualizer');
  });
});
