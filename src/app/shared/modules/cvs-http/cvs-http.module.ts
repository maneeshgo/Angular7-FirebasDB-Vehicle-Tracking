import { CommonModule } from '@angular/common';
import { CVSHttpInterceptor } from './cvs-http-interceptor.service';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { NgModule, ModuleWithProviders, Optional, SkipSelf } from '@angular/core';

/**
 * @author: Shoukath Mohammed
 */
@NgModule({
  imports: [
    CommonModule
    , HttpClientModule
  ],
  declarations: []
})
export class CvsHttpModule {
  /**
   * @static
   */
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CvsHttpModule,
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: CVSHttpInterceptor,
          multi: true
        }
      ]
    };
  }

  /**
   * @constructor
   * @param: {parentModule<CvsHttpModule>}
   */
  constructor(
    @Optional() @SkipSelf() parentModule: CvsHttpModule) { }
}
