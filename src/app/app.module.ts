import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { SigComponent } from './sig/sig.component';

import { NormalizeService } from './services/normalize.service';
import { ExportComponent } from './export/export.component';

const appRoutes: Routes = [
  { path: '', component: SigComponent },
  { path: 'export', component: ExportComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    SigComponent,
    ExportComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      //{ enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule,
	FormsModule,
	ReactiveFormsModule,
	HttpClientModule
  ],
  providers: [
    NormalizeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
