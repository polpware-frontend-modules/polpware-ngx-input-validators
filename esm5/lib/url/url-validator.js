import * as Url from 'url-parse';
export function validateUrl(value, parseQuery) {
    var pattern = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
    var expr = new RegExp(pattern);
    if (!expr.test(value)) {
        return { invalid: true };
    }
    var results = new Url(value, parseQuery);
    if (!results.protocol || !results.host) {
        return { invalid: true };
    }
    return results;
}
/**
* Given a valid url, returns the normalized host name.
* The returned host name does not include www and is lowercase.
* The returned host includes host number.
* {} string
*/
export function normalizeHost(s, rm3w) {
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
export function normalizeUrl(s, keepQuery, endWithSlash) {
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
    return v.invalid !== undefined;
}
export function buildUrlValidator(options) {
    var inputs = Object.assign({}, options);
    return function (control) {
        var value = control.value;
        var results = validateUrl(value, !!inputs.parseQuery);
        if (isInvalidSpec(results)) {
            return results;
        }
        if (inputs.https && results.protocol !== 'https') {
            return { invalid: true };
        }
        return null;
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXJsLXZhbGlkYXRvci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bwb2xwd2FyZS9uZ3gtaW5wdXQtdmFsaWRhdG9ycy8iLCJzb3VyY2VzIjpbImxpYi91cmwvdXJsLXZhbGlkYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQSxPQUFPLEtBQUssR0FBRyxNQUFNLFdBQVcsQ0FBQztBQXlCakMsTUFBTSxVQUFVLFdBQVcsQ0FBQyxLQUFhLEVBQUUsVUFBbUI7SUFFMUQsSUFBTSxPQUFPLEdBQUcsdURBQXVELENBQUM7SUFDeEUsSUFBTSxJQUFJLEdBQUcsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDakMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7UUFDbkIsT0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQztLQUM1QjtJQUVELElBQU0sT0FBTyxHQUFHLElBQUksR0FBRyxDQUFDLEtBQUssRUFBRSxVQUFVLENBQW9CLENBQUM7SUFFOUQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFO1FBQ3BDLE9BQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUM7S0FDNUI7SUFFRCxPQUFPLE9BQU8sQ0FBQztBQUNuQixDQUFDO0FBR0Q7Ozs7O0VBS0U7QUFDRixNQUFNLFVBQVUsYUFBYSxDQUFDLENBQVMsRUFBRSxJQUFvQjtJQUFwQixxQkFBQSxFQUFBLFdBQW9CO0lBQ3pELCtCQUErQjtJQUMvQixJQUFNLE9BQU8sR0FBRyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQW9CLENBQUM7SUFDOUMsSUFBSSxDQUFDLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQztJQUNyQixJQUFJLENBQUMsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLEVBQUU7UUFDckIsSUFBSSxJQUFJLEVBQUU7WUFDTixDQUFDLEdBQUcsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUN0QjtLQUNKO1NBQU07UUFDSCxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ1AsQ0FBQyxHQUFHLE1BQU0sR0FBRyxDQUFDLENBQUM7U0FDbEI7S0FDSjtJQUVELE9BQU8sQ0FBQyxDQUFDO0FBQ2IsQ0FBQztBQUVELE1BQU0sVUFBVSxZQUFZLENBQUMsQ0FBUyxFQUFFLFNBQTBCLEVBQUUsWUFBNkI7SUFDN0YsK0JBQStCO0lBREssMEJBQUEsRUFBQSxpQkFBMEI7SUFBRSw2QkFBQSxFQUFBLG9CQUE2QjtJQUc3RixJQUFNLE9BQU8sR0FBRyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQW9CLENBQUM7SUFDOUMsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQztJQUM1QixJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFHLENBQUM7SUFDcEMsSUFBSSxDQUFDLEdBQUcsT0FBTyxDQUFDLFFBQVEsR0FBRyxJQUFJLEdBQUcsT0FBTyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7SUFDdEQsSUFBSSxTQUFTLEVBQUU7UUFDWCxDQUFDLEdBQUcsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUM7S0FDekI7SUFFRCxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUU7UUFDakIsSUFBSSxDQUFDLFlBQVksRUFBRTtZQUNmLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO1NBQ2pDO0tBQ0o7U0FBTTtRQUNILElBQUksWUFBWSxFQUFFO1lBQ2QsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7U0FDZjtLQUNKO0lBRUQsT0FBTyxDQUFDLENBQUM7QUFDYixDQUFDO0FBRUQsa0JBQWtCO0FBQ2xCLFNBQVMsYUFBYSxDQUFDLENBQWlDO0lBQ3BELE9BQXNCLENBQUUsQ0FBQyxPQUFPLEtBQUssU0FBUyxDQUFDO0FBQ25ELENBQUM7QUFFRCxNQUFNLFVBQVUsaUJBQWlCLENBQUMsT0FHakM7SUFFRyxJQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUUxQyxPQUFPLFVBQVMsT0FBb0I7UUFDaEMsSUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQztRQUU1QixJQUFNLE9BQU8sR0FBRyxXQUFXLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7UUFFeEQsSUFBSSxhQUFhLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDeEIsT0FBTyxPQUFPLENBQUM7U0FDbEI7UUFFRCxJQUFJLE1BQU0sQ0FBQyxLQUFLLElBQUksT0FBTyxDQUFDLFFBQVEsS0FBSyxPQUFPLEVBQUU7WUFDOUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQztTQUM1QjtRQUVELE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUMsQ0FBQztBQUNOLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBGb3JtQ29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuXHJcbmltcG9ydCAqIGFzIFVybCBmcm9tICd1cmwtcGFyc2UnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJVXJsUGFyc2VSZXN1bHQge1xyXG4gICAgcHJvdG9jb2w6ICdodHRwJyB8ICdodHRwcyc7XHJcbiAgICBzbGFzaGVzOiBib29sZWFuO1xyXG4gICAgYXV0aDogc3RyaW5nO1xyXG4gICAgdXNlcm5hbWU6IHN0cmluZztcclxuICAgIHBhc3N3b3JkOiBzdHJpbmc7XHJcbiAgICBob3N0OiBzdHJpbmc7ICAvLyB3aXRoIHBvcnQgbnVtYmVyIFxyXG4gICAgaG9zdG5hbWU6IHN0cmluZzsgLy8gd2l0aG91dCBwb3J0IG51bWJlciBcclxuICAgIHBvcnQ6IG51bWJlcjsgLy8gcG9ydCBudW1iZXJcclxuICAgIHBhdGhuYW1lOiBzdHJpbmc7XHJcbiAgICBxdWVyeTogYW55O1xyXG4gICAgaGFzaDogc3RyaW5nOyAvLyAjIHBhcnRcclxuICAgIGhyZWY6IHN0cmluZztcclxuICAgIG9yaWdpbjogc3RyaW5nO1xyXG5cclxuICAgIHNldChrZXk6IHN0cmluZywgdmFsdWU6IHN0cmluZyk7XHJcbiAgICB0b1N0cmluZygpOiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUludmFsaWRTcGVjIHtcclxuICAgIGludmFsaWQ6IGJvb2xlYW47XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiB2YWxpZGF0ZVVybCh2YWx1ZTogc3RyaW5nLCBwYXJzZVF1ZXJ5OiBib29sZWFuKTogSUludmFsaWRTcGVjIHwgSVVybFBhcnNlUmVzdWx0IHtcclxuXHJcbiAgICBjb25zdCBwYXR0ZXJuID0gJyhodHRwcz86Ly8pPyhbXFxcXGRhLXouLV0rKVxcXFwuKFthLXouXXsyLDZ9KVsvXFxcXHcgLi1dKi8/JztcclxuICAgIGNvbnN0IGV4cHIgPSBuZXcgUmVnRXhwKHBhdHRlcm4pO1xyXG4gICAgaWYgKCFleHByLnRlc3QodmFsdWUpKSB7XHJcbiAgICAgICAgcmV0dXJuIHsgaW52YWxpZDogdHJ1ZSB9O1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHJlc3VsdHMgPSBuZXcgVXJsKHZhbHVlLCBwYXJzZVF1ZXJ5KSBhcyBJVXJsUGFyc2VSZXN1bHQ7XHJcblxyXG4gICAgaWYgKCFyZXN1bHRzLnByb3RvY29sIHx8ICFyZXN1bHRzLmhvc3QpIHtcclxuICAgICAgICByZXR1cm4geyBpbnZhbGlkOiB0cnVlIH07XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHJlc3VsdHM7XHJcbn1cclxuXHJcblxyXG4vKipcclxuKiBHaXZlbiBhIHZhbGlkIHVybCwgcmV0dXJucyB0aGUgbm9ybWFsaXplZCBob3N0IG5hbWUuIFxyXG4qIFRoZSByZXR1cm5lZCBob3N0IG5hbWUgZG9lcyBub3QgaW5jbHVkZSB3d3cgYW5kIGlzIGxvd2VyY2FzZS5cclxuKiBUaGUgcmV0dXJuZWQgaG9zdCBpbmNsdWRlcyBob3N0IG51bWJlci4gXHJcbioge30gc3RyaW5nXHJcbiovXHJcbmV4cG9ydCBmdW5jdGlvbiBub3JtYWxpemVIb3N0KHM6IHN0cmluZywgcm0zdzogYm9vbGVhbiA9IHRydWUpIHtcclxuICAgIC8vIEFzc3VtZSB0aGF0IHMgaXMgYSB2YWxpZCB1cmxcclxuICAgIGNvbnN0IHJlc3VsdHMgPSBuZXcgVXJsKHMpIGFzIElVcmxQYXJzZVJlc3VsdDtcclxuICAgIGxldCBoID0gcmVzdWx0cy5ob3N0O1xyXG4gICAgaWYgKGguc3RhcnRzV2l0aCgnd3d3JykpIHtcclxuICAgICAgICBpZiAocm0zdykge1xyXG4gICAgICAgICAgICBoID0gaC5zdWJzdHJpbmcoNCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBpZiAoIXJtM3cpIHtcclxuICAgICAgICAgICAgaCA9ICd3d3cuJyArIGg7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBoO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gbm9ybWFsaXplVXJsKHM6IHN0cmluZywga2VlcFF1ZXJ5OiBib29sZWFuID0gZmFsc2UsIGVuZFdpdGhTbGFzaDogYm9vbGVhbiA9IGZhbHNlKSB7XHJcbiAgICAvLyBBc3N1bWUgdGhhdCBzIGlzIGEgdmFsaWQgdXJsXHJcblxyXG4gICAgY29uc3QgcmVzdWx0cyA9IG5ldyBVcmwocykgYXMgSVVybFBhcnNlUmVzdWx0O1xyXG4gICAgbGV0IHBhdGggPSByZXN1bHRzLnBhdGhuYW1lO1xyXG4gICAgcGF0aCA9IHBhdGgucmVwbGFjZSgvXFwvXFwvL2csICcvJywgKTtcclxuICAgIGxldCB1ID0gcmVzdWx0cy5wcm90b2NvbCArICcvLycgKyByZXN1bHRzLmhvc3QgKyBwYXRoO1xyXG4gICAgaWYgKGtlZXBRdWVyeSkge1xyXG4gICAgICAgIHUgPSB1ICsgcmVzdWx0cy5xdWVyeTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodS5lbmRzV2l0aCgnLycpKSB7XHJcbiAgICAgICAgaWYgKCFlbmRXaXRoU2xhc2gpIHtcclxuICAgICAgICAgICAgdSA9IHUuc3Vic3RyKDAsIHUubGVuZ3RoIC0gMSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBpZiAoZW5kV2l0aFNsYXNoKSB7XHJcbiAgICAgICAgICAgIHUgPSB1ICsgJy8nO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdTtcclxufVxyXG5cclxuLy8gVHlwZSBwcmVkaWNhdGUgXHJcbmZ1bmN0aW9uIGlzSW52YWxpZFNwZWModjogSVVybFBhcnNlUmVzdWx0IHwgSUludmFsaWRTcGVjKTogdiBpcyBJSW52YWxpZFNwZWMge1xyXG4gICAgcmV0dXJuICg8SUludmFsaWRTcGVjPnYpLmludmFsaWQgIT09IHVuZGVmaW5lZDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGJ1aWxkVXJsVmFsaWRhdG9yKG9wdGlvbnM/OiB7XHJcbiAgICBodHRwcz86IGJvb2xlYW47XHJcbiAgICBwYXJzZVF1ZXJ5PzogYm9vbGVhbjtcclxufSkge1xyXG5cclxuICAgIGNvbnN0IGlucHV0cyA9IE9iamVjdC5hc3NpZ24oe30sIG9wdGlvbnMpO1xyXG5cclxuICAgIHJldHVybiBmdW5jdGlvbihjb250cm9sOiBGb3JtQ29udHJvbCkge1xyXG4gICAgICAgIGNvbnN0IHZhbHVlID0gY29udHJvbC52YWx1ZTtcclxuXHJcbiAgICAgICAgY29uc3QgcmVzdWx0cyA9IHZhbGlkYXRlVXJsKHZhbHVlLCAhIWlucHV0cy5wYXJzZVF1ZXJ5KTtcclxuXHJcbiAgICAgICAgaWYgKGlzSW52YWxpZFNwZWMocmVzdWx0cykpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdHM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoaW5wdXRzLmh0dHBzICYmIHJlc3VsdHMucHJvdG9jb2wgIT09ICdodHRwcycpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHsgaW52YWxpZDogdHJ1ZSB9O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9O1xyXG59XHJcbiJdfQ==