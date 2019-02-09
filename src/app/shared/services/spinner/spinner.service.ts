import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

/**
 * @author: Shoukath Mohammed
 */
@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  /**
   * @private
   * @type: {display$<BehaviorSubject<boolean>>}
   * @description: An observable that emits spinner events.
   */
  private display$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  /**
   * @constructor
   */
  constructor() { }

  /**
   * @public
   * @return: void
   * @description: a helper function to show the spinner.
   */
  public show(): void {
    this.display$.next(true);
  }

  /**
   * @public
   * @return: void
   * @description: a helper function to hide the spinner.
   */
  public hide(): void {
    this.display$.next(false);
  }

  /**
   * @public
   * @return: void
   * @description: a helper function that lets other subscribe
   * to the spinner view.
   */
  public load(): BehaviorSubject<boolean> {
    return this.display$;
  }
}
