import { Injectable, EventEmitter } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  internalServerError: EventEmitter<void> = new EventEmitter<void>();

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 500) {
          this.internalServerError.emit();
        }
        return throwError(error);
      })
    );
  }
}
