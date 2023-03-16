import {
  DEFAULT_CURRENCY_CODE,
  ErrorHandler,
  LOCALE_ID,
  NgModule,
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from './material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { GlobalHttpInterceptor } from './core/http-handler/global-http.interceptor';
import { LoaderComponent } from './components/loader/loader.component';
import { GlobalErrorHandler } from './core/http-handler/global-error-handler';
import { PageErrorComponent } from './feature/page-error/page-error.component';
import localePt from '@angular/common/locales/pt';
import { registerLocaleData, DatePipe } from '@angular/common';
import { AngularFireModule, FirebaseOptions } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from 'src/environments/environment';
import config from '../assets/config.json';

registerLocaleData(localePt, 'pt');

export const getConfigFireModule = () => {
  if (environment.production) {
    return {
      apiKey: process.env.apiKey,
      authDomain: process.env.authDomain,
      projectId: process.env.projectId,
      storageBucket: process.env.storageBucket,
      messagingSenderId: process.env.messagingSenderId,
      appId: process.env.appId,
      measurementId: process.env.measurementId,
    };
  } else {
    return {
      apiKey: 'AIzaSyALnvoK_6yQhkUQAydqFVenPc5nfbx-Rt0',
      authDomain: 'toca-fominha-dev.firebaseapp.com',
      projectId: 'toca-fominha-dev',
      storageBucket: 'toca-fominha-dev.appspot.com',
      messagingSenderId: '1058881912976',
      appId: '1:1058881912976:web:bc7c7a321699d199929815',
      measurementId: 'G-E23NL8YSJM',
    };
  }
};

@NgModule({
  declarations: [AppComponent, LoaderComponent, PageErrorComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(getConfigFireModule),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: GlobalHttpInterceptor,
      multi: true,
    },
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    { provide: LOCALE_ID, useValue: 'pt-br' },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' },
    DatePipe,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
