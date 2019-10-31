// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'https://inventariofendidev.innovaway.it/fendi/private/',
  auth0options: {
    domain: "fendi-warehouse.eu.auth0.com",
    client_id: "dOcLCHYs2crEX24FuyWYtjmTMsfa9Dr1",
    redirect_uri: `${window.location.origin}/callback`,
    responseType: 'token id_token',
    audience: "https://fendi-api.com",
    scope: 'read:rules',
  },
  logoutRedirect: '/login',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
