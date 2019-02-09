
import * as _ from 'lodash';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AjaxRequest } from './ajax.interface';
import { EnvConfigService } from './../env-config/env-config.service';
import { HttpClient, HttpHeaders, HttpEvent } from '@angular/common/http';

// putting common headers outside the request
const commonHeaders: any = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
};

/**
 * @author: Shoukath Mohammed
 */
@Injectable({
  providedIn: 'root'
})
export class AjaxService {

  /**
   * @constructor
   * @param: {http<HttpClient>}
   */
  constructor(
    private http: HttpClient,
    private econfig: EnvConfigService) { }

  /**
   * @GET
   * @public
   * @param: {request<AjaxRequest>}
   * @return {Observable<HttpEvent<T>>}
   */
  public get<T>(request: AjaxRequest): Observable<HttpEvent<T>> {
    // merge the common headers with the request headers
    const httpOptions: any = {
      headers: new HttpHeaders(Object.assign({},
        commonHeaders, (request.headers || {})
      ))
    };

    // construct the request url
    const url: string = request.url + (request.id || '');
    return this.http.get<T>(url, httpOptions);
  }

  /**
   * @PUT
   * @public
   * @param: {request<AjaxRequest>}
   * @return {Observable<T>}
   */
  public put<T>(request: AjaxRequest): Observable<T> {
    // construct the request url
    const url: string = request.url + (request.id || '');
    return this.http.put<T>(url, request.body);
  }

  /**
   * @POST
   * @public
   * @param: {request<AjaxRequest>}
   * @return {Observable<HttpEvent<T>>}
   */
  public post<T>(request: AjaxRequest): Observable<HttpEvent<T>> {
    // merge the common headers with the request headers
    const httpOptions: any = {
      headers: new HttpHeaders(Object.assign({},
        commonHeaders, (request.headers || {})
      ))
    };

    return this.http.post<T>(
      request.url, request.body, httpOptions
    );
  }

  /**
   * @DELETE
   * @public
   * @param: {request<AjaxRequest>}
   * @return {Observable<T>}
   */
  public delete<T>(request: AjaxRequest): Observable<T> {
    // construct the request url
    const url: string = request.url + (request.id || '');
    return this.http.delete<T>(url);
  }

  /**
   * @ALL
   * @public
   * @param: {req<AjaxRequest>}
   * @return {Observable<HttpEvent<T>>}
   */
  public request<T>(req: AjaxRequest): Observable<HttpEvent<T>> {
    return this.http.request<T>(req.method, req.url, req.options);
  }

  /**
   * @public
   * @param: {config: any}
   * @return: {Object<AjaxRequest>}
   * @description: Helper method to format ajax request params
   */
  public getAjaxRequestConfig(config: any
    , url?: string, env?: string): AjaxRequest {

    // in case if the request environment
    // is local, load the local service config.
    const _url: string = (!config.useLocal)
      ? `${url + config.subdomain}`
      : config.url;

    return {
      url: _url,
      method: config.method,
      options: {
        params: config.queryParams,
        body: _.get(config, 'options.body')
      },
      headers: _.extend({}, commonHeaders, config.headers, {
        ENV: env
      })
    };
  }

  /**
   * @public
   * @param: {serviceName<string>}
   * @return: any
   * @description: a helper method that constructs
   * the request payload and configuration.
   */
  public getConfig(serviceName: string): any {
    const econfig: any = this.econfig.getEnvConfig()
          , serviceConfig: any = this.econfig.getServiceConfig(serviceName)
          , payload: any = this.getAjaxRequestConfig(
              serviceConfig,
              econfig.config.baseUrl,
              econfig.env
            )
          , serviceContext: any = econfig.context;

    return {
      payload: {
        url: payload.url,
        method: payload.method,
        options: {
          headers: payload.headers
        }
      },
      config: econfig.config,
      context: serviceContext
    };
  }
}
