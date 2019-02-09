import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

// access to the native window object
declare const window: any;

/**
 * @author: Shoukath Mohammed
 * @Modified By: Manish Gupta
 * @Modified Date: 10-24-2018
 */
@Injectable({
    providedIn: 'root'
})
export class ProfileService {
    /**
     * @private
     * @type: any
     * @description: keeps track of files loaded
     * in the dom.
     */
    private loaderStatus: any = {};

    /**
     * @private
     * @type: {Subject<boolean>}
     * @description: display modal subject
     */
    private isMobile$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    /**
     * @private
     * @type: {boolean}
     * @description: a flag to track the form
     * submission status.
     */
    private formSubmitted: boolean = false;

    /**
     * @private
     * @type: {boolean}
     * @description: a flag to track the form
     * submission status.
     */
    /**
     * @constructor
     */
    constructor() {
        this.isMobile$.next(window.innerWidth < 767);
    }

    /**
     * @public
     * @return: void
     * @description: emits the current state of the user's screen
     */
    public setPlatform(value: boolean): void {
        this.isMobile$.next(value);
    }

    /**
     * @public
     * @return: {Observable<boolean>}
     * @description: lets other subscribe to current platform event
     */
    public get isMobilePlatform$(): Observable<boolean> {
        return this.isMobile$.asObservable();
    }

    /**
     * @public
     * @return: {boolean}
     * @description: activate the success message page
     */
    public get isFormSubmitted(): boolean {
        return this.formSubmitted;
    }

    /**
     * @public
     * @return: void
     * @description: sets the form submission status
     */
    public setFormSubmitFlag(submitted: boolean): void {
        this.formSubmitted = submitted;
    }

    /**
     * @public
     * @param: {fileName<string>}
     * @return: {boolean}
     * @description: returns the loader status
     * for a particular file.
     */
    public getLoaderStatus(fileName: string): boolean {
        return this.loaderStatus[fileName];
    }

    /**
     * @public
     * @param: {fileName<string>}
     * @param: {val<boolean>}
     * @return: void
     * @description: sets the loader status
     * for a particular file.
     */
    public setLoaderStatus(fileName: string, val: boolean): void {
        this.loaderStatus[fileName] = val;
    }
}
