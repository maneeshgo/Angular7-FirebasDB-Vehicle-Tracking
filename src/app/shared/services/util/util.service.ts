import * as is from 'is_js';
import { Subscription } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { Injectable, ElementRef, NgZone } from '@angular/core';

// access to the native window object
declare const window: any;

// access to the native document object
declare const document: any;

/**
 * @author: Shoukath Mohammed
 */
@Injectable({
  providedIn: 'root'
})
export class UtilService {
  /**
   * @constructor
   */
  constructor(
    private zone: NgZone,
    private titleService: Title) { }

  /**
   * @public
   * @param: {content<string>}
   * @return: boolean
   *
   * @description: returns if the given string has
   * embedded HTML
   */
  public static isHTML(content: string): boolean {
    const _isHTML: Function = RegExp.prototype.test.bind(/(<([^>]+)>)/i);
    return _isHTML(content);
  }

  /**
   * @public
   * @param : {prefix <string> }
   * @returns string
   */
  public static getUUId(prefix?: string): string {
    const uId: any = (): number => Math.floor(Math.random() * 10000);
    return `${prefix || ''}_${uId()}_${uId()}`;
  }

  /**
   * @public
   * @param: {key<string>} -> key for lookup
   * @return: string - query string value
   * @description: picks up the query string from the
   * URL & returns the value for the given key.
   *
   * @example:
   * URL -> `https://www.google.com?name=Mohammed`
   *
   * this.getQueryStringValue('name') -> 'Mohammed'
   */
  public getQueryStringValue(key: string, parse?: boolean): string {
    let value: any = window.unescape(
      window.location.search.replace(
        new RegExp(
          '^(?:.*[&\\?]' +
            window.escape(key).replace(/[\.\+\*]/g, '\\$&') +
            '(?:\\=([^&]*))?)?.*$',
          'i'
        ),
        '$1'
      )
    );

    // return parsed value, skip errors
    if (parse) {
      try {
        value = JSON.parse(value);
      } catch (e) {}
    }
    return value;
  }

  /**
   * @public
   * @param: {display<boolean>}
   * @return: void
   * @description: sets the document scroll, this is
   * required since the document is embedded within
   * an iframe.
   */
  public setDocumentScroll(display: boolean): void {
    document.documentElement.style.overflow = (display) ? 'hidden' : 'scroll';
    document.body.scroll = (display) ? 'no' : 'yes';
  }

  /**
   * @public
   * @param: {e<any>}
   * @param: {pattern<Regex>}
   * @return: void
   * @description: a reusable handler for keypress events.
   */
  public fnKeyPress(e: any, pattern: RegExp): boolean {
    // in case of paste event don't do anything
    if (e && (e.ctrlKey || e.metaKey)) {
      return;
    }

    const spc: string = '$Backspace$Del$Home$Tab$Left$Right$Up$Down$End$ArrowLeft$ArrowRight$ArrowUp$ArrowDown$Delete$';
    if (spc.indexOf('$' + e.key + '$') < 0) {
      let key: any = e.keyCode || e.which;
      const regex: RegExp = pattern;

      key = String.fromCharCode(key);
      if (!regex.test(key)) {
        e.preventDefault();
        return false;
      }
    }

    return true;
  }

  /**
   * @public
   * @param: {url<string>}
   * @return: void
   * @description: navigates user to the requested
   * url or the root of server path when loaded within
   * an iframe.
   */
  public navigateTo(url?: string): void {
    window.parent.location.href = url || window.parent.location.origin;
  }

  /**
   * @public
   * @return: boolean
   * @description: determines if the current device
   * is an IOS device.
   */
  public isIOS(): boolean {
    const nav: any = window.parent.navigator
    , uaMatched: boolean = /iPad|iPhone|iPod/.test(nav.userAgent)
                               && !window.MSStream

    , platformMatched: boolean = !!nav.platform
                               && /iPad|iPhone|iPod/.test(nav.platform);

    if (is.ios() || uaMatched || platformMatched) {
      return true;
    }
    return false;
  }

  /**
   * @public
   * @return: number[]
   * @description: a helper method that fetches
   * the element position.
   */
  public getElementPos(obj: any): number[] {
    let curtop: number = 0;
    const isLoadedInIframe: boolean = (window !== window.parent);

    if (obj && obj.offsetParent) {
      do {
        curtop += obj.offsetTop;
      } while (obj = obj.offsetParent);

      // in case of an iframe the scroll position
      // is not accurate it needs to cut down the
      // position by 100.
      if (isLoadedInIframe && curtop > 100) {
        curtop = curtop - 100;
      }

      return [curtop];
    }
    return null;
  }

  /**
   * @public
   * @return: void
   * @description: a helper method that scrolls to
   * the requested element.
   */
  public scrollToElement(selector: string,
    elRef: ElementRef, force?: boolean): void {

    setTimeout(() => {
      if (!selector || !elRef) {
        return;
      }

      const ref: HTMLElement = elRef.nativeElement;
      const el: HTMLElement = ref.ownerDocument.querySelector(selector);

      if (el && el.focus) {
        const isMobile: boolean = this.getPlatform() === 'mweb';

        // currently with iframe integration links upon
        // tapping don't seem to work in IOS mobile, the
        // idea is to find the element position and scroll
        // into it manually. It's only required for IOS mobile.
        if (!force && (!isMobile || (isMobile && !this.isIOS()))) {
          el.focus();
        } else {
          const pos: number[] = this.getElementPos(el);

          // ensure the position is returned
          el.focus();
          if (Array.isArray(pos)) {
            window.parent.scroll(0, pos);

            // fallback focus
            el.focus();
          }

          // iframe issue can't help. if the focus is still not
          // received re-trigger focus.
          this.zone.run(() => {
            if (document.activeElement !== el) {
              el.focus();
            }
          });
        }
      }
    });
  }

  /**
   * @public
   * @return: string - device type
   * @description: determines the device type based on
   * the device user agent.
   */
  public getDeviceType(): string {
    // Other
    let deviceType = 'DESKTOP';
    const ua: string = this.getUserAgent();

    // Android Specific Checks
    if (/Android/i.test(ua)) {
      // Android Mobile
      if (/Mobile/i.test(ua)) {
        deviceType = 'AND_MOBILE';
      } else if (/Glass/i.test(ua)) {
        deviceType = 'AND_GLASS';
      } else {
        deviceType = 'AND_TABLET';
      }
    } else if (/iPhone|iPod/i.test(ua)) {
      deviceType = 'IOS_MOBILE';
    } else if (/iPad/i.test(ua)) {
      deviceType = 'IOS_TABLET';
    } else if (/IEMobile/i.test(ua)) {
      deviceType = 'WIN_MOBILE';
    } else if (/webOS|BlackBerry|Opera Mini/i.test(ua)) {
      deviceType = 'OTH_MOBILE';
    }
    return deviceType;
  }

  /**
   * @public
   * @return: string - device user agent
   * @description: detects the device user agent.
   */
  public getUserAgent(): string {
    return window.navigator.userAgent;
  }

  /**
   * @public
   * @return: string - app name
   * @description: determines the app name.
   */
  public getAppName(): string {
    return !window.native ? 'CMK_WEB' : 'CMK_APP';
  }

  /**
   * @public
   * @return: string - channel name
   * @description: determines the channel name.
   */
  public getChannelName(): string {
    return this.getDeviceType() !== 'DESKTOP'
    ? 'MOBILE' : 'WEB';
  }

  /**
   * @public
   * @return: string - hostname
   * @description: detects the current hostname.
   */
  public getHostName(): string {
    return window.location.hostname;
  }

  /**
   * @public
   * @return {string} - platfrom type
   * @description - a helper method to determine the
   * adobe platform.
   */
  public getPlatform(): string {
    const dType: string = this.getDeviceType() || '';

    return (dType !== 'DESKTOP')
      ? ((dType.indexOf('TABLET') > -1) ? 'tweb' : 'mweb')
      : 'dweb';
  }

  /**
   * @public
   * @param: {arr<Subscription[]>}
   * @return: void
   * @description: unsubscribes active subscriptions on the page.
   */
  public unsubscribe(arr: Subscription[]): void {
    if (!Array.isArray(arr)) {
      return;
    }

    // safely unsubscribe the subscriptions
    for (let i = 0; i < arr.length; i++) {
      if (!!arr[i]) {
        arr[i].unsubscribe();
      }
    }
  }

  /**
   * @public
   * @description:  takes the unformatted string
   * and formats it by replacing the the arbitary
   * text inside the curly braces with the dynamic
   * values.
   *
   * This is similar to `String.format` but it doesn't
   * extract the arguments directly instead it expects
   * the second argument to be an array of dynamic values
   * corresponding to their indexes in the string to format.
   *
   * If there are no dynamic values to be replaced,
   * the second argument can be passed as false
   *
   * @return: {string} formatted string
   */
  public format(key: string, args: any[] | null, strConst: any): string {
    let str: string = strConst ? strConst[key] : key;

    // in case if URL doesn't exist return empty
    if (!str) {
      return '';
    }

    // if there are no arguments return the URL itself
    if (!args) {
      return str;
    }

    // construct the url by replacing the arbitary
    // text inside the curly braces
    for (let i = 0; i < (<any[]>args).length; i++) {
      str = str.replace(new RegExp('\\{' + i + '\\}', 'gi'), (<any[]>args)[i]);
    }
    return str;
  }

  /**
   * @public
   * @returns string
   * @description: a helper method that fetches a
   * cookie based on it's name.
   */
  public getCookie(cookieName: string): string {
    const cookieArr = document.cookie.match(
      '(^|;)\\s*' + cookieName + '\\s*=\\s*([^;]+)'
    );
    return cookieArr ? cookieArr.pop() : '';
  }

  /**
   * @public
   * @returns void
   * @description: a helper method that sets the
   * title.
   */
  public setTitle(title: string): void {
    this.titleService.setTitle(title);
 }
}
