// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  bff: 'http://192.168.1.9:3001',
  firebaseConfig: {
    apiKey: "AIzaSyAuykiSP5JWTFGvxajRuhXNkg47bMthZqE",
    authDomain: "toca-fominha.firebaseapp.com",
    projectId: "toca-fominha",
    storageBucket: "toca-fominha.appspot.com",
    messagingSenderId: "100452196370",
    appId: "1:100452196370:web:9d2dd6c584ac53738cb8cb"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
