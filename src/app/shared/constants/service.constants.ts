import * as _ from 'lodash';
import { environment } from 'src/environments/environment';


/**
 * @author: Shoukath Mohammed
 * @constant
 */
const baseUrl: string = './assets/api/';

/**
 * @method
 * @constant
 *
 * @param: {fileName<string>} - local JSON file name without
 * `.json` extension.
 *
 * @return: {config<Object>}
 * @description: generates local configuration object.
 */
const generateConfig: Function = (fileName: string, local?: boolean): any => {
  // do not generate the config if the environment
  // does not match
  if (!environment.local) {
    return;
  }

  return {
    url: `${baseUrl}${fileName}.json?`,
    method: 'GET',
    useLocal: local || false
  };
};

/**
 * @config
 * @constant
 *
 * @example:
 * `generateConfig('submitDiabeticSupplyOrder', true)` -> the second
 * parameter should to be `true` if you want to use local JSON.
 *
 * @description: local configuration.
 */
const localConfig: any = {
  getCommunicationList: generateConfig('getCommunicationList', true),
  getCommunicationDoc: generateConfig('getCommunicationDoc', true)
};

/**
 * @config
 * @constant
 *
 * @description: actual development & production environment config.
 */
const mainConfig: any = {
  getCommunicationList: {
    subdomain: 'depservices/communication/getCommunicationList/1.0.0',
    method: 'POST',
    headers: {},
    isVordel: false,
    queryParams: {}
  },
  getCommunicationDoc: {
    subdomain: 'depservices/communication/getCommunicationDoc/1.0.0',
    method: 'POST',
    headers: {},
    isVordel: false,
    queryParams: {}
  }
};

/**
 * @method
 * @constant
 *
 * @param: {fileName<string>} - local JSON file name without
 * `.json` extension.
 *
 * @return: {config<Object>}
 * @description: generates local configuration object.
 */
const processLocalConfig: Function = (): any => {
  const obj: any = {};

  // get the keys for the default local config
  const localConfigKeys: string[] = _.keys(localConfig);

  // fetch the services that needed to be loaded locally
  for (const key of localConfigKeys) {
    if (localConfig[key] && localConfig[key].useLocal) {
      obj[key] = localConfig[key];
    }
  }
  return _.extend({}, mainConfig, obj);
};

/**
 * @method
 * @constant
 *
 * @return: {config<Object>}
 * @description: generates the service configuration based on
 * the environment type.
 */
export const serviceConfig: any = ((): any => {
    const _config: any = environment.local
        ? processLocalConfig()
        : mainConfig;

    return _config;
})();
