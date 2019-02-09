import { FormControl } from '@angular/forms';

/**
 * @author: Shoukath Mohammed
 */
export class CustomValidators {
  /**
   * @public
   * @static
   * @param: {c<FormControl>}
   * @return: any
   * @description: a custom validator to validate
   * an email address.
   */
  public static email(c: FormControl): any {
    const pattern: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return CustomValidators.fn(pattern, 'email', c.value);
  }

  /**
   * @public
   * @static
   * @param: {c<FormControl>}
   * @return: any
   * @description: a custom validator to validate
   * the date of birth.
   */
  public static dob(c: FormControl): any {
    const pattern: RegExp = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/;
    return CustomValidators.fn(pattern, 'dob', c.value, () => {

      const __BASE_YEAR__: number = 1800;

      // parser for DOB
      const get: Function = (val: string): number => {
        return parseInt((val || '0'), null);
      };

      // in case if the DOB field value is empty
      // fail the validation.
      if (!c.value) {
        return false;
      }

      let errors: number = 0;
      const inputs: string[] = (c.value).replace('_', '').split('/');

      // check if the month entered is valid
      if (get(inputs[0]) > 12 || get(inputs[0]) < 1) {
        errors++;
      }

      // check if the day entered is valid
      if (get(inputs[1]) > 31 || get(inputs[0]) < 1) {
        errors++;
      }

      // check if the day entered is valid
      const now: Date = new Date();
      const dateEntered: Date = new Date(c.value);
      if ((get(inputs[2]) > now.getFullYear())
        || (get(inputs[2]) < __BASE_YEAR__)
        || (get(inputs[2]) === now.getFullYear() && (dateEntered > now))) {
        errors++;
      }

      return (errors > 0) ? false : true;
    });
  }

  /**
   * @public
   * @static
   * @param: {c<FormControl>}
   * @return: any
   * @description: a custom validator to validate
   * a zip code.
   */
  public static zipCode(c: FormControl): any {
    const pattern: RegExp = /^\d{5}$|^\d{5}-\d{4}$/;
    return CustomValidators.fn(pattern, 'zipCode', c.value);
  }

  /**
   * @public
   * @static
   * @param: {c<FormControl>}
   * @return: any
   * @description: a custom validator to validate
   * a phone number.
   */
  public static phone(c: FormControl): any {
    if (!!c.value) {
      const pattern: RegExp = /^\(?([2-9][0-9][0-9])\)?[- ]?([0-9]{3})[- ]?([0-9]{4})$/;
      return CustomValidators.fn(pattern, 'phone', c.value);
    }
    return null;
  }

  /**
   * @private
   * @static
   * @param: {pattern<RegExp>}
   * @param: {key<string>}
   * @param: {inputValue<any>}
   * @return: any
   * @description: a helper method for reusability.
   */
  private static fn(pattern: RegExp,
    key: string, inputValue: any, cb?: Function): any {

    if (!(pattern instanceof RegExp) || !key) {
      return null;
    }

    const val: any = {};
    if (!pattern.test(inputValue)) {
      val[key] = true;
      return val;
    }

    if (cb && cb instanceof Function && !cb()) {
      val[key] = true;
      return val;
    }
    return null;
  }
}
