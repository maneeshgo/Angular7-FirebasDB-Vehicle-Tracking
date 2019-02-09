import * as is from 'is_js';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { UtilService } from './../../../services/util/util.service';
import { SpinnerService } from './../../../services/spinner/spinner.service';

// access to the native document
declare const document: any;

/**
 * @interface
 */
export interface SpinnerConfig {
  backdrop?: string;
  spinnerText?: string;
  imageSource?: string;
}

/**
 * @default
 * @constant
 */
const spinnerDefaults: SpinnerConfig = {
  backdrop: 'black',
  spinnerText: 'Loading...',
  imageSource: 'assets/images/CVS-spinner.gif'
};

/**
 * @author: Shoukath Mohammed
 */
@Component({
  selector: 'cvs-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit, OnDestroy {
  /**
   * @public
   * @type: SpinnerConfig
   */
  @Input()
  public config: SpinnerConfig;

  /**
   * @public
   * @type: boolean
   */
  public display = false;

  /**
   * @public
   * @type: Subscription
   */
  public subsription: Subscription;

  /**
   * @public
   * @type: Subscription
   */
  public subscriptions: Subscription[] = [];

  /**
   * @constructor
   * @param: {util<UtilService>}
   * @param: {spinner<SpinnerService>}
   */
  constructor(
    private util: UtilService,
    private spinner: SpinnerService) {
    this.initSubscription();
  }

  /**
   * @public
   * @type: method<life cycle hook>
   * @return: void
   * @description: N/A
   */
  public ngOnInit() {
    setTimeout(() => {
      this.config = Object.assign({},
        spinnerDefaults, (this.config || {})
      );
    }, 50);
  }

  /**
   * @private
   * @return: void
   * @description: subscribes to the spinner display event.
   */
  private initSubscription(): void {
    this.subsription = this.spinner.load()
      .subscribe(value => {
        this.display = value;
        this.update();
      });

    // push the subscription to the subscription
    // list so it can be destroyed.
    this.subscriptions.push(this.subsription);
  }

  /**
   * @private
   * @return: void
   * @description: removes the overflow property so the
   * background cannot be accessed by the user.
   */
  private update(): void {
   this.util.setDocumentScroll(this.display);
  }

  /**
   * @public
   * @type: method<life cycle hook>
   * @return: void
   * @description: destroy all subscribed events
   */
  public ngOnDestroy(): void {
    this.util.unsubscribe(this.subscriptions);
  }
}
