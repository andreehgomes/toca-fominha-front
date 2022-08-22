import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from './material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { GlobalHttpInterceptor } from './core/http-handler/global-http.interceptor';
import { LoaderComponent } from './components/loader/loader.component'
import { GlobalErrorHandler } from './core/http-handler/global-error-handler';
import { PageErrorComponent } from './feature/page-error/page-error.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';


@NgModule({
  declarations: [
    AppComponent,
    LoaderComponent,
    PageErrorComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: GlobalHttpInterceptor,  multi: true },
    { provide: ErrorHandler, useClass: GlobalErrorHandler }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
