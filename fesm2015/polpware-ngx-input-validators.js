import * as Url from 'url-parse';
import { ɵɵdefineNgModule, ɵɵdefineInjector, ɵɵsetNgModuleScope, ɵsetClassMetadata, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

function validateUrl(value, parseQuery) {
    const pattern = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
    const expr = new RegExp(pattern);
    if (!expr.test(value)) {
        return { url: 'Invalid URL' };
    }
    const results = new Url(value, parseQuery);
    if (!results.protocol || !results.host) {
        return { url: 'Invalid URL' };
    }
    return results;
}
/**
* Given a valid url, returns the normalized host name.
* The returned host name does not include www and is lowercase.
* The returned host includes host number.
* {} string
*/
function normalizeHost(s, rm3w = true) {
    // Assume that s is a valid url
    const results = new Url(s);
    let h = results.host;
    if (h.startsWith('www')) {
        if (rm3w) {
            h = h.substring(4);
        }
    }
    else {
        if (!rm3w) {
            h = 'www.' + h;
        }
    }
    return h;
}
function normalizeUrl(s, keepQuery = false, endWithSlash = false) {
    // Assume that s is a valid url
    const results = new Url(s);
    let path = results.pathname;
    path = path.replace(/\/\//g, '/');
    let u = results.protocol + '//' + results.host + path;
    if (keepQuery) {
        u = u + results.query;
    }
    if (u.endsWith('/')) {
        if (!endWithSlash) {
            u = u.substr(0, u.length - 1);
        }
    }
    else {
        if (endWithSlash) {
            u = u + '/';
        }
    }
    return u;
}
// Type predicate 
function isInvalidSpec(v) {
    return v.url !== undefined;
}
function buildUrlValidator(options) {
    const inputs = Object.assign({}, options);
    return function (control) {
        const value = control.value;
        const results = validateUrl(value, !!inputs.parseQuery);
        if (isInvalidSpec(results)) {
            return results;
        }
        if (inputs.https && results.protocol !== 'https') {
            return { url: 'HTTPS Required' };
        }
        return null;
    };
}

class NgxInputValidatorsModule {
}
NgxInputValidatorsModule.ɵmod = ɵɵdefineNgModule({ type: NgxInputValidatorsModule });
NgxInputValidatorsModule.ɵinj = ɵɵdefineInjector({ factory: function NgxInputValidatorsModule_Factory(t) { return new (t || NgxInputValidatorsModule)(); }, imports: [[
            FormsModule
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵɵsetNgModuleScope(NgxInputValidatorsModule, { imports: [FormsModule] }); })();
/*@__PURE__*/ (function () { ɵsetClassMetadata(NgxInputValidatorsModule, [{
        type: NgModule,
        args: [{
                declarations: [],
                imports: [
                    FormsModule
                ],
                exports: []
            }]
    }], null, null); })();

/*
 * Public API Surface of ngx-input-validators
 */

/**
 * Generated bundle index. Do not edit.
 */

export { NgxInputValidatorsModule, buildUrlValidator, isInvalidSpec, normalizeHost, normalizeUrl, validateUrl };
//# sourceMappingURL=polpware-ngx-input-validators.js.map
