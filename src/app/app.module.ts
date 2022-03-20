import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { DiagramComponent } from './components/diagram/diagram.component';
import { DataDisplayComponent } from './components/data-display/data-display.component';
import { SequencingComponent } from './components/sequencing/sequencing.component';
import { TcGraphComponent } from './components/tc-graph/tc-graph.component';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DiagramComponent,
    DataDisplayComponent,
    SequencingComponent,
    TcGraphComponent,
  ],
  imports: [BrowserModule, HttpClientModule, ChartsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
