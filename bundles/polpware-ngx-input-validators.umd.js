(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('url-parse'), require('@angular/core'), require('@angular/forms')) :
    typeof define === 'function' && define.amd ? define('@polpware/ngx-input-validators', ['exports', 'url-parse', '@angular/core', '@angular/forms'], factory) :
    (global = global || self, factory((global.polpware = global.polpware || {}, global.polpware['ngx-input-validators'] = {}), global.Url, global.ng.core, global.ng.forms));
}(this, (function (exports, Url, core, forms) { 'use strict';

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
        NgxInputValidatorsModule.ɵmod = core.ɵɵdefineNgModule({ type: NgxInputValidatorsModule });
        NgxInputValidatorsModule.ɵinj = core.ɵɵdefineInjector({ factory: function NgxInputValidatorsModule_Factory(t) { return new (t || NgxInputValidatorsModule)(); }, imports: [[
                    forms.FormsModule
                ]] });
        return NgxInputValidatorsModule;
    }());
    (function () { (typeof ngJitMode === "undefined" || ngJitMode) && core.ɵɵsetNgModuleScope(NgxInputValidatorsModule, { imports: [forms.FormsModule] }); })();
    /*@__PURE__*/ (function () { core.ɵsetClassMetadata(NgxInputValidatorsModule, [{
            type: core.NgModule,
            args: [{
                    declarations: [],
                    imports: [
                        forms.FormsModule
                    ],
                    exports: []
                }]
        }], null, null); })();

    exports.NgxInputValidatorsModule = NgxInputValidatorsModule;
    exports.buildUrlValidator = buildUrlValidator;
    exports.normalizeHost = normalizeHost;
    exports.normalizeUrl = normalizeUrl;
    exports.validateUrl = validateUrl;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=polpware-ngx-input-validators.umd.js.map
