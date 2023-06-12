export type SupportedLocales = 'en_US' | 'id_ID' | 'th_TH' | 'ms_MY' | 'vi_VN';
export declare const apiBaseURL: string;
export declare const baseURL: string;
export declare const supportedLocales: SupportedLocales[];

export declare function getGatewayURL(version?: string): string;
