import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CheckEngineComponent } from './components/check-engine/check-engine.component';
import { HeaderComponent } from './components/header/header.component';
import { DiagramComponent } from './components/diagram/diagram.component';
import { DataDisplayComponent } from './components/data-display/data-display.component';
import { SequencingComponent } from './components/sequencing/sequencing.component';
import { TcGraphComponent } from './components/tc-graph/tc-graph.component';
import { ChartsModule } from 'ng2-charts';
import { PtGraphComponent } from './pt-graph/pt-graph.component';
import { FmGraphComponent } from './fm-graph/fm-graph.component';
import { LcGraphComponent } from './lc-graph/lc-graph.component';

@NgModule({
  declarations: [
    AppComponent,
    CheckEngineComponent,
    HeaderComponent,
    DiagramComponent,
    DataDisplayComponent,
    SequencingComponent,
    TcGraphComponent,
    PtGraphComponent,
    FmGraphComponent,
    LcGraphComponent,
  ],
  imports: [BrowserModule, HttpClientModule, ChartsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
