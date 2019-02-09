import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { SpinnerService } from './../../services/spinner/spinner.service';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse } from '@angular/common/http';

/**
 * @author: Shoukath Mohammed
 */
@Injectable()
export class CVSHttpInterceptor implements HttpInterceptor {
  /**
   * @private
   * @type: number
   */
  private activeRequests = 0;

  /**
   * @constructor
   * @param {spinner<SpinnerService>}
   */
  constructor(private spinner: SpinnerService) { }

  /**
   * @public
   * @param: {req<HttpRequest<any>>}
   * @param: {next<HttpHandler>}
   *
   * @return: {Observable<HttpEvent<any>>}
   * @description: N/A
   */
  public intercept(req: HttpRequest<any>,
    next: HttpHandler): Observable<HttpEvent<any>> {

    this.show();
    return next.handle(req).pipe(
      tap(evt => {
        if (evt instanceof HttpResponse) {
          this.hide();
        }
      },
      (err) => {
        this.hide();
      },
      () => { })
    );
  }

  /**
   * @private
   * @return: void
   * @description: hides the spinner
   * service request are completed.
   */
  private hide(): void {
    this.activeRequests--;

    if (this.activeRequests <= 0) {
      this.spinner.hide();
    }
  }

  /**
   * @private
   * @return: void
   * @description: triggers the spinner
   * display as service requests are received.
   */
  private show(): void {
    this.activeRequests++;

    if (this.activeRequests === 1) {
      this.spinner.show();
    }
  }
}
