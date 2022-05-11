/************************************************************
 * file: global-error-handler.ts
 * coms: Handle all exceptions unhandled in the application.
 *       If other class handle an exception, this class won't be called
 *       Tutorial where this code comes from:
 * https://medium.com/@michael.karen/esperando-lo-inesperado-buenas-pr%C3%A1cticas-para-el-manejo-de-errores-en-angular-dc578da68ef9
 ************************************************************/

import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from './services/error.service';
import { NotificationService } from './services/notification.service';
import { LoggingService } from './services/logging.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  constructor(private injector: Injector) { }

  handleError(error: Error | HttpErrorResponse) {
    const errorService = this.injector.get(ErrorService);
    const logger = this.injector.get(LoggingService);
    const notifier = this.injector.get(NotificationService);

    let message;
    let stackTrace;
    if (error instanceof HttpErrorResponse) {
      // Server error
      message = errorService.getServerErrorMessage(error);
      //stackTrace = errorService.getServerErrorStackTrace(error);
      notifier.showError(message);
      logger.logError(message, '');
      console.error(error);
    }
    //else {
      // Client Error
      //message = errorService.getClientErrorMessage(error);
      //notifier.showError(message);
    //}
    // Always log errors
    //logger.logError(message, stackTrace);

  }
}
