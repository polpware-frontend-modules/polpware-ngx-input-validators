import * as Url from 'url-parse';
import { ɵɵdefineNgModule, ɵɵdefineInjector, ɵɵsetNgModuleScope, ɵsetClassMetadata, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

function validateUrl(value, parseQuery) {
    var pattern = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
    var expr = new RegExp(pattern);
    if (!expr.test(value)) {
        return { url: 'Invalid URL' };
    }
    var results = new Url(value, parseQuery);
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
function normalizeHost(s, rm3w) {
    if (rm3w === void 0) { rm3w = true; }
    // Assume that s is a valid url
    var results = new Url(s);
    var h = results.host;
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
function normalizeUrl(s, keepQuery, endWithSlash) {
    // Assume that s is a valid url
    if (keepQuery === void 0) { keepQuery = false; }
    if (endWithSlash === void 0) { endWithSlash = false; }
    var results = new Url(s);
    var path = results.pathname;
    path = path.replace(/\/\//g, '/');
    var u = results.protocol + '//' + results.host + path;
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
    var inputs = Object.assign({}, options);
    return function (control) {
        var value = control.value;
        var results = validateUrl(value, !!inputs.parseQuery);
        if (isInvalidSpec(results)) {
            return results;
        }
        if (inputs.https && results.protocol !== 'https') {
            return { url: 'HTTPS Required' };
        }
        return null;
    };
}

var NgxInputValidatorsModule = /** @class */ (function () {
    function NgxInputValidatorsModule() {
    }
    NgxInputValidatorsModule.ɵmod = ɵɵdefineNgModule({ type: NgxInputValidatorsModule });
    NgxInputValidatorsModule.ɵinj = ɵɵdefineInjector({ factory: function NgxInputValidatorsModule_Factory(t) { return new (t || NgxInputValidatorsModule)(); }, imports: [[
                FormsModule
            ]] });
    return NgxInputValidatorsModule;
}());
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
