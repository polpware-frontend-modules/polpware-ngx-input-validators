import * as i1 from '@angular/forms';
import { UntypedFormControl } from '@angular/forms';
import * as i0 from '@angular/core';

interface IUrlParseResult {
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
interface IInvalidSpec {
    url: string;
}
declare function validateUrl(value: string, parseQuery: boolean): IInvalidSpec | IUrlParseResult;
/**
* Given a valid url, returns the normalized host name.
* The returned host name does not include www and is lowercase.
* The returned host includes host number.
* {} string
*/
declare function normalizeHost(s: string, rm3w?: boolean): string;
declare function normalizeUrl(s: string, keepQuery?: boolean, endWithSlash?: boolean): string;
declare function isInvalidSpec(v: IUrlParseResult | IInvalidSpec): v is IInvalidSpec;
declare function buildUrlValidator(options?: {
    https?: boolean;
    parseQuery?: boolean;
}): (control: UntypedFormControl) => IInvalidSpec;

declare class NgxInputValidatorsModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<NgxInputValidatorsModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<NgxInputValidatorsModule, never, [typeof i1.FormsModule], never>;
    static ɵinj: i0.ɵɵInjectorDeclaration<NgxInputValidatorsModule>;
}

export { NgxInputValidatorsModule, buildUrlValidator, isInvalidSpec, normalizeHost, normalizeUrl, validateUrl };
export type { IInvalidSpec, IUrlParseResult };
//# sourceMappingURL=polpware-ngx-input-validators.d.ts.map
