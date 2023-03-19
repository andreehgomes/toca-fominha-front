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
import { ConfigFirebaseService } from './core/config-firebase/config-firebase.service';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth'
import { AngularFireAuthGuard } from '@angular/fire/auth-guard'

registerLocaleData(localePt, 'pt');

export const getConfigFireBase =
  (configFirebaseService: ConfigFirebaseService) => () => {
    return configFirebaseService.getConfigFireBase();
  };

@NgModule({
  declarations: [AppComponent, LoaderComponent, PageErrorComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    AngularFireAuthModule
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
