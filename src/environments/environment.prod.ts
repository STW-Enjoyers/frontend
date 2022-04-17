/* file: environment.prod.ts
 * Coms: In this file, we can specify constants, functions, classes..
 *       that we can use in production mode.
 *       To use this file, execute: ng serve -o --configuration production
 */

// https://www.tutorialesprogramacionya.com/angularya/detalleconcepto.php?punto=62&codigo=62&inicio=60
export const environment = {
  production: true,
  url: 'https://unizapp-backend.herokuapp.com/api'
};
