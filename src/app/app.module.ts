import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { DiagramComponent } from './components/diagram/diagram.component';
import { DataDisplayComponent } from './components/data-display/data-display.component';
import { SequencingComponent } from './components/sequencing/sequencing.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DiagramComponent,
    DataDisplayComponent,
    SequencingComponent,
  ],
  imports: [BrowserModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
