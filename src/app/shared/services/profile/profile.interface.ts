/**
 * @author Shoukath Mohammed
 */

/**
 * @interface
 * @description: a blue print for active field display event.
 */
export interface ActiveFieldEvent {
    fieldName: string;
    eventType?: string;
    page?: any;
    data?: any;
}

/**
 * @interface
 * @description: a blue print for modal display event.
 */
export interface ModalDisplayEvent {
    display: boolean;
    modalType: number;
    triggeredBy?: string;
}

/**
 * @enum
 * @description: responsible for tracking the current modal request
 */
export enum ModalType {
    SignIn,

    ECLookUpByCardNo,

    ECLookUpByDemographic,

    ECLookUpResult
}

/**
 * @enum
 * @description: responsible for tracking the current page.
 */
export enum ActivePage {
    Shop,

    SignIn,

    WeeklyAd,

    ExtraCare
}
