import { EnvBaseConfig } from './environment.config';

/**
 * @author: Shoukath Mohammed
 */
// set the production environment to true
// export the new configuration
class EnvConfig extends EnvBaseConfig {
    constructor() {
        super();
        this.local = true;
        this.debug = true;
    }
}

// export the new configuration
export const environment: any = { ...new EnvConfig() };
