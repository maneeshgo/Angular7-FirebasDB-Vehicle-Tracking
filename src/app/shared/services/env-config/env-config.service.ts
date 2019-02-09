import { ENV_CONFIG } from './env-config';
import { Injectable } from '@angular/core';
import { UtilService } from './../util/util.service';
import { ServiceContext } from './env-config.interface';
import { serviceConfig } from './../../constants/service.constants';
import { environment } from 'src/environments/environment';


/**
 * @author: Shoukath Mohammed
 */
@Injectable({
  providedIn: 'root'
})

export class EnvConfigService {
  /**
   * @public
   * @type: string[]
   */
  public envs: string[] = [
    'cte', 'stp', 'sit1',
    'sit2', 'sit3', 'dev1',
    'dev2', 'dev3', 'local'
  ];

  /**
   * @constructor
   * @param: {util<UtilService>}
   */
  constructor(private util: UtilService) { }

  /**
   * @public
   * @return: string
   * @description: a helper method that picks
   * the current environment up based on the
   * host name.
   */
  public getEnv(): string {
    let env: string = 'prod';
    const host: string = this.util.getHostName();

    for (const i of this.envs) {
      if (host && host.includes(i)) {
        env = i;
        break;
      }
    }

    return (env === 'local')
      ? environment.stack
      : env;
  }

  /**
   * @public
   * @return: string
   * @description: a helper method that returns
   * the common service content for reusability.
   */
  public getServiceCtx(config?: ServiceContext): ServiceContext {
    const ctx: ServiceContext = {
      'lineOfBusiness': 'ECCM',
      'appName': this.util.getAppName(),
      'conversationID': '1010'
    };
    return Object.assign({}, ctx, (config || {}));
  }

  /**
   * @public
   * @return: any
   * @description: a helper method that returns
   * the environment configuration that is picked
   * up based on the active host.
   */
  public getEnvConfig(): any {
    const env: string = this.getEnv() || 'prod';

    return {
      env: env,
      config: ENV_CONFIG[env],
      context: this.getServiceCtx()
    };
  }

  /**
   * @public
   * @param: {serviceName<string>}
   * @return: any
   * @description: a helper method that returns
   * the service configuration for a requested
   * service.
   */
  public getServiceConfig(serviceName: string): any {
    return serviceConfig[serviceName] || {};
  }
}
