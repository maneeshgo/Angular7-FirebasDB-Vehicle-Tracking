import { Observable, Subscriber } from 'rxjs';
import { LoaderEvent } from './dynamic-loader.model';

/**
 * @author: Shoukath Mohammed
 **
/**
 * @name: LoaderOptions
 * @type: Interface
 */
export interface LoaderOptions {
  url: string;
  cid?: string;
  debug?: boolean;
  async?: boolean;
  mediaType?: string;
  elementId?: string;
  isStylesheet?: boolean;
  insertBefore?: boolean;
  targetElement: HTMLElement;
  insertBeforeElement?: HTMLElement;
}

/**
 * @name: NodeLoadEvent<T>
 * @type: Interface
 */
export interface NodeLoadEvent<T> {
  el?: T;
  options?: LoaderOptions;
  observer$?: Subscriber<any>;
  isLoaded$?: Observable<LoaderEvent>;
}

/**
 * @name: NodeOptions
 * @type: Interface
 */
export interface NodeOptions {
  options?: LoaderOptions;
  observer$?: Subscriber<any>;
  isLoaded$: Observable<LoaderEvent>;
}

/**
 * @name: NodePreset
 * @type: Interface
 */
export interface NodePreset {
  originalValue: any;
  fallbackValue: any;
}
