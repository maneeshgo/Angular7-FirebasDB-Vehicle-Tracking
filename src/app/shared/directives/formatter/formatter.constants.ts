/**
 * @author: Manish Gupta
 * @description: declare union type for supported formats
 */
export type SupportedFormats = 'phone' | 'date';

/**
 * @interface
 */
export interface FormatterConfig {
  length: 10;
  allow: RegExp;
  format: string;
  pattern: RegExp;
  replace: RegExp;
}

/**
 * @constant
 */
export const REGEX_MATCHER: any = {
  date: {
    pattern: /^(\d{0,2})(\d{0,2})(\d{0,4})/,
    format: '$1/$2/$3',
    replace: /\//g,
    allow: /^(\d{0,7})$/,
    length: 8
  },
  phone: {
    pattern: /^(\d{0,3})(\d{0,3})(\d{0,4})/,
    format: '$1-$2-$3',
    replace: /\-/g,
    allow: /^(\d{0,9})$/,
    length: 10
  }
};
