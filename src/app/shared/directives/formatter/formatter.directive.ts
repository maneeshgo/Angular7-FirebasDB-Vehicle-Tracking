import { CustomValidators } from './../../misc/forms';
import { NgControl, Validators } from '@angular/forms';
import { Directive, HostListener, Input, OnChanges } from '@angular/core';
import { SupportedFormats, REGEX_MATCHER, FormatterConfig } from './formatter.constants';

/**
 * @author: Shoukath Mohammed
 */
@Directive({
  selector: '[cvsFormatter]'
})
export class FormatterDirective implements OnChanges {
  /**
   * @public
   * @Input
   */
  @Input()
  public config: FormatterConfig;

  /**
   * @public
   * @Input
   */
  @Input()
  public optional: boolean = false;

  /**
   * @public
   * @Input
   */
  @Input()
  public cvsFormatter: SupportedFormats;

  /**
   * @constructor
   * @param: {model<NgControl>}
   */
  constructor(private model: NgControl) {}

  /**
   * @public
   * @HostListener
   */
  @HostListener('blur', ['$event'])
  public onBlur = this._onBlur;

  /**
   * @public
   * @HostListener
   */
  @HostListener('focus', ['$event'])
  public onFocus = this._onFocus;

  /**
   * @public
   * @HostListener
   */
  @HostListener('paste', ['$event'])
  public onPaste = this._onPaste;

  /**
   * @public
   * @HostListener
   */
  @HostListener('keypress', ['$event'])
  public onKeyPress = this._onKeyPress;

  /**
   * @public
   * @type: method<life cycle hook>
   * @return: void
   * @description: NA
   */
  public ngOnChanges(): void {
    this._setConfig();
  }

  /**
   * @param: {e<KeyboardEvent>}
   * @return: boolean
   * @description: checks if the user input is allowed, prevents
   * inputting the value if it's forbidden.
   */
  private _onKeyPress(e: KeyboardEvent): boolean {
    // in case of paste event don't do anything
    if (e && (e.ctrlKey || e.metaKey) || !this.config) {
      return;
    }

    const val: string = (<any>e.target).value;
    const spc: string = '$Backspace$Del$Home$Tab$Left$Right$Up$Down$End$ArrowLeft$ArrowRight$ArrowUp$ArrowDown$Delete$';
    if (spc.indexOf('$' + e.key + '$') < 0) {
      let key: any = e.keyCode || e.which;
      const regex: any = /[0-9]/;

      key = String.fromCharCode(key);
      if (!regex.test(key) || (val && val.length >= this.config.length)) {
        e.preventDefault();
      }
    }

  }

  /**
   * @param: {e<ClipboardEvent>}
   * @return: boolean
   * @description: checks if the user input is allowed, prevents
   * pasting the value if it's forbidden.
   */
  private _onPaste(e: ClipboardEvent): boolean {
    if (!this.config) { return; }

    let val: string = e.clipboardData.getData('text/plain') || '';
    const regex: RegExp = this.config.allow;

    // if the length of the entered value is
    // greater than the accepted limit. Just slice
    // the value to accepted limit.
    if (val && val.length > this.config.length) {
      val = val.slice(0, this.config.length);
      this.model.valueAccessor.writeValue(val);
    }

    // restrict user's operation if the current
    // input is forbidden
    if (val && !regex.test(val) || !this._isNum(val)) {
      e.preventDefault();
      return false;
    }
    return true;
  }

  /**
   * @private
   * @param: {val<string>}
   * @return: boolean
   * @description: checks if the entered value
   * is a number or not.
   */
  private _isNum(val: string): boolean {
    let num: boolean = false;

    try {
      const v: number = (+val);
      num = (typeof v === 'number');
    } catch (e) {
      num = false;
    }

    return !!num;
  }

  /**
   * @param: {e<FocusEvent>}
   * @return: boolean
   * @description: checks if the user input is allowed, prevents
   * pasting the value if it's forbidden.
   */
  private _onFocus(e: FocusEvent): boolean {
    const val: string = (<any>e.target).value;

    if (val && this.config) {
      const newValue: string = val
      .replace(this.config.replace, '');

      this.model.control.setErrors(null);
      this.model.control.clearValidators();
      this.model.valueAccessor.writeValue(newValue);
    }

    this._updateValidity();
    return true;
  }

  /**
   * @param: {e<FocusEvent>}
   * @return: boolean
   * @description: checks if the user input
   * is allowed, prevents pasting the value
   * if it's forbidden.
   */
  private _onBlur(e: FocusEvent): boolean {
    const val: string = (<any>e.target).value;

    if (val && this.config) {
      let newValue: string = val;

      // format only the value entered is equivalent
      // to the length of required value.
      if (val.length === this.config.length) {
        newValue = val.replace(this.config.replace, '')
        .replace(this.config.pattern, this.config.format);
      }

      this.model.valueAccessor.writeValue(newValue);
      this.model.control.setValue(newValue);
    }

    this._updateValidity(true);
    return true;
  }

  /**
   * @private
   * @return: void
   * @description: updates the validity of the
   * active control.
   */
  private _updateValidity(addValidator?: boolean): void {
    setTimeout(() => {
      if (!this.model) { return; }

      if (addValidator) {
        this.model.control.clearValidators();
        this.model.control.setValidators(this._getValidators());
      }
      this.model.control.updateValueAndValidity();
    });
  }

 /**
   * @private
   * @return: any[]
   * @description: a helper method to
   * construct the validators list.
   */
  private _getValidators(): any[] {
    const vds: any[] = [
      CustomValidators[this.cvsFormatter]
    ];

    // in case of optional field
    // do not add required validators
    if (this.optional) {
      return vds;
    }

    // in case of required field
    // add the required validator
    vds.push(Validators.required);
    return vds;
  }

  /**
   * @private
   * @return: void
   * @description: fetches the formatting
   * configuration.
   */
  private _setConfig(): void {
    this.config = this.config || REGEX_MATCHER[this.cvsFormatter];
  }
}
