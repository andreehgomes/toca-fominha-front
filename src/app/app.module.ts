import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { GlobalHttpInterceptor } from './core/http-handler/global-http.interceptor';
import { LoaderComponent } from './components/loader/loader.component'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { GlobalErrorHandler } from './core/http-handler/global-error-handler';
import { MatButtonModule } from '@angular/material/button';
import { PageErrorComponent } from './feature/page-error/page-error.component';
import { MatExpansionModule } from '@angular/material/expansion'

@NgModule({
  declarations: [
    AppComponent,
    LoaderComponent,
    PageErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatButtonModule,
    MatExpansionModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: GlobalHttpInterceptor,  multi: true },
    { provide: ErrorHandler, useClass: GlobalErrorHandler }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
