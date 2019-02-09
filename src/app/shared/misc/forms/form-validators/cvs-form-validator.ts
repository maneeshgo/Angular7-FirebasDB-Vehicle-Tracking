import * as _ from 'lodash';
import { FormGroup, AbstractControl } from '@angular/forms';

/**
 * @author: Manish Gupta
 * @description: Custom validator to validate form field based on passed validation
 */
export class CVSFormValidator {
  /**
   * @private
   * @type: FormGroup
   */
  private keys: string[];

  /**
   * @private
   * @type: FormGroup
   */
  private form: FormGroup;

  /**
   * @private
   * @type: string
   */
  private formType: string;

  /**
   * @private
   * @type: any[]
   */
  private errors: any[] = [];

  /**
   * @private
   * @type: string[]
   */
  private ignores: string[] = ['label', 'self'];

  /**
   * @private
   * @type: any
   */
  private validationErrors: any;

  /**
   * @constructor
   * @param: {form<FormGroup>}
   * @param: {formType<string>}
   */
  constructor(form: FormGroup, validationErrors: any) {
    this.form = form;
    this.validationErrors = validationErrors;
  }

  /**
   * @private
   * @returns: void
   * @description: a helper method that
   * kick offs the field validation.
   */
  public validate(): any[] {
    this._init();
    return this.errors;
  }

  /**
   * @private
   * @returns: void
   * @description: a helper method that
   * initializes the validations.
   */
  private _init(): void {
    this.keys = _.keys(this.form.value);
    this._run();
  }

  /**
   * @private
   * @returns: void
   * @description: this method verifies and captures
   * the field errors by running a recurssive loop.
   */
  private _run(keys?: string[], form?: FormGroup): void {
    const _keys: string[] = keys || this.keys;

    _.each(_keys, k => {
      // for the first time, it uses the parent keys
      // later on it will pick up the recurssive child keys.
      const field: AbstractControl = (form || this.form).get(k);

      // checking to see if the form contol do exist.
      if (field) {
        // if there's a nested form/ form group name then it
        // runs recurssively until we capture all the errors.
        if (field instanceof FormGroup) {
          this._run(_.keys(field.value), field);
        } else {
          // if the current keys is not a form group then
          // capture the errors.
          this._push(k, field);
        }
      }
    });
  }

  /**
   * @private
   * @returns: void
   * @description: a helper method that captures the field
   * errors by skipping the igored items.
   */
  private _push(key: string, field: AbstractControl): void {
    if (!field.valid) {
      if (this.validationErrors[key]) {
        this.errors.push(this.validationErrors[key]);
      }
    }
  }
}
