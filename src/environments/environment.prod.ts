import { EnvBaseConfig } from './environment.config';

/**
 * @author: Shoukath Mohammed
 */
// set the production environment to true
// export the new configuration
class EnvConfig extends EnvBaseConfig {
    constructor() {
        super();
        this.production = true;
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
