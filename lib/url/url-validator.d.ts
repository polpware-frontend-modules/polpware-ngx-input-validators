import { FormControl } from '@angular/forms';
export interface IUrlParseResult {
    protocol: 'http' | 'https';
    slashes: boolean;
    auth: string;
    username: string;
    password: string;
    host: string;
    hostname: string;
    port: number;
    pathname: string;
    query: any;
    hash: string;
    href: string;
    origin: string;
    set(key: string, value: string): any;
    toString(): string;
}
export interface IInvalidSpec {
    url: string;
}
export declare function validateUrl(value: string, parseQuery: boolean): IInvalidSpec | IUrlParseResult;
/**
* Given a valid url, returns the normalized host name.
* The returned host name does not include www and is lowercase.
* The returned host includes host number.
* {} string
*/
export declare function normalizeHost(s: string, rm3w?: boolean): string;
export declare function normalizeUrl(s: string, keepQuery?: boolean, endWithSlash?: boolean): string;
export declare function isInvalidSpec(v: IUrlParseResult | IInvalidSpec): v is IInvalidSpec;
export declare function buildUrlValidator(options?: {
    https?: boolean;
    parseQuery?: boolean;
}): (control: FormControl) => IInvalidSpec;
