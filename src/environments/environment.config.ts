/**
 * @author: Shoukath Mohammed
 */

/**
 * @config
 */
export class EnvBaseConfig {
    public stack: string = 'local';
    public local: boolean = false;
    public debug: boolean = false;
    public production: boolean = false;
    public development: boolean = false;

    /**
     * @constructor
     */
    constructor() { }
}
