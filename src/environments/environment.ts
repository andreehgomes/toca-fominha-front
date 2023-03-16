// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId,
    appId: process.env.appId,
    measurementId: process.env.measurementId
  },
};

// apiKey: 'AIzaSyALnvoK_6yQhkUQAydqFVenPc5nfbx-Rt0',
    // authDomain: 'toca-fominha-dev.firebaseapp.com',
    // projectId: 'toca-fominha-dev',
    // storageBucket: 'toca-fominha-dev.appspot.com',
    // messagingSenderId: '1058881912976',
    // appId: '1:1058881912976:web:bc7c7a321699d199929815',
    // measurementId: 'G-E23NL8YSJM',

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
