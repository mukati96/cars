// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  staging: false,
  siteURL: 'http://dev-dealer.postyourcars.com',
  apiUrl: 'http://dev-admin.postyourcars.com/api/v1',
  GEOCODE_API_BASE_URL: "https://maps.googleapis.com/maps/api/geocode/json",
  GEOCODE_API_KEY: 'AIzaSyC27Tz06wW7QFMKfCLbSdtV383QMcEdQWY'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
