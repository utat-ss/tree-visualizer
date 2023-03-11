import { NgModule } from "@angular/core"
import { BrowserModule } from "@angular/platform-browser"
import { HttpClientModule } from "@angular/common/http"

import { AppRoutingModule } from "./app-routing.module"
import { AppComponent } from "./app.component"
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"
import { OrgChartComponent } from "./components/org-chart/org-chart.component";

@NgModule({
    declarations: [AppComponent, OrgChartComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
