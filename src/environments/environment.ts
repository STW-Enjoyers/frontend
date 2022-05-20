/* file: environment.ts
 * Coms: In this file, we can specify constants, functions, classes..
 *       that we can use in development mode.
 *       To use this file, execute: ng serve -o
 */

// https://www.tutorialesprogramacionya.com/angularya/detalleconcepto.php?punto=62&codigo=62&inicio=60
export const environment = {
  production: false,
  url: 'http://localhost:3000/api',
  recaptcha: {
    siteKey: '6LfKNi0cAAAAACeYwFRY9_d_qjGhpiwYUo5gNW5-',
  },
};
