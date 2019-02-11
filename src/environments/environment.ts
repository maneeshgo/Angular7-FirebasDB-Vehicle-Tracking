// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular.json`.
import { EnvBaseConfig } from './environment.config';

/**
 * @author: Manish Gupta
 */
// set the local environment to true
class EnvConfig extends EnvBaseConfig {
    constructor() {
        super();
        this.development = true;
    }

    firebaseConfig = {
      apiKey: 'AIzaSyB_MGp73cBj-Y-CP_WMZfivc5hBViTZwxU',
      authDomain: 'jewellery-shop-814b1.firebaseapp.com',
      databaseURL: 'https://jewellery-shop-814b1.firebaseio.com',
      projectId: 'jewellery-shop-814b1',
      storageBucket: 'jewellery-shop-814b1.appspot.com',
      messagingSenderId: '52570091962'
    };
}

// export the new configuration
export const environment: any = { ...new EnvConfig() };
