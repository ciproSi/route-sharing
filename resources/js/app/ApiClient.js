export default class ApiClient {
 
    static requestHeaders(options) {
        const default_headers = {
            'Accept': 'application/json',
            'Content-type': 'application/json'
        }
 
        if (options !== undefined && options.headers !== undefined) {
            return {
                ...default_headers,
                ...headers
            }
        } else {
            return default_headers;
        }
    }
 
    static async get(url, options) {
 
        options = options === undefined ? {} : options;
 
        options.headers = ApiClient.requestHeaders(options);
 
        const default_options = {
            method: 'get'
        }
 
        const response = await fetch(url, {
            ...default_options,
            ...options
        })
 
        return await response;
    }
 
    static async post(url, options) {
 
        await fetch('/sanctum/csrf-cookie');
 
        options = options === undefined ? {} : options;
 
        options.headers = ApiClient.requestHeaders(options);
 
        // add the XSRF token from cookie
        options.headers['X-XSRF-TOKEN'] = ApiClient.getCookie('XSRF-TOKEN');
 
        const default_options = {
            method: 'post'
        }
 
        const response = await fetch(url, {
            ...default_options,
            ...options
        })
 
        return response;
    }
 
    static getCookie(name) {
        // Split cookie string and get all individual name=value pairs in an array
        var cookieArr = document.cookie.split(";");
 
        // Loop through the array elements
        for(var i = 0; i < cookieArr.length; i++) {
            var cookiePair = cookieArr[i].split("=");
 
            /* Removing whitespace at the beginning of the cookie name
            and compare it with the given string */
            if(name == cookiePair[0].trim()) {
                // Decode the cookie value and return
                return decodeURIComponent(cookiePair[1]);
            }
        }
 
        // Return null if not found
        return null;
    }
}