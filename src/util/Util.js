const contentType = require("./content-type");
const ENCODE_CHARS_REGEXP = /(?:[^\x21\x25\x26-\x3B\x3D\x3F-\x5B\x5D\x5F\x61-\x7A\x7E]|%(?:[^0-9A-Fa-f]|[0-9A-Fa-f][^0-9A-Fa-f]|$))+/g;
const UNMATCHED_SURROGATE_PAIR_REGEXP = /(^|[^\uD800-\uDBFF])[\uDC00-\uDFFF]|[\uD800-\uDBFF]([^\uDC00-\uDFFF]|$)/g;
const UNMATCHED_SURROGATE_PAIR_REPLACE = "$1\uFFFD$2";

class Util {

    static setCharset(type, charset) {
        const parsed = contentType.parse(type);
        parsed.parameters.charset = charset;
        return contentType.format(parsed);
    }

    /**
     * Encode a URL to a percent-encoded form, excluding already-encoded sequences.
     *
     * This function will take an already-encoded URL and encode all the non-URL
     * code points. This function will not encode the "%" character unless it is
     * not part of a valid sequence (`%20` will be left as-is, but `%foo` will
     * be encoded as `%25foo`).
     *
     * This encode is meant to be "safe" and does not throw errors. It will try as
     * hard as it can to properly encode the given URL, including replacing any raw,
     * unpaired surrogate pairs with the Unicode replacement character prior to
     * encoding.
     *
     * @param {string} url The URL you wish to concode
     * @returns {string}
     */
    static encodeUrl(url) {
        return String(url)
            .replace(UNMATCHED_SURROGATE_PAIR_REGEXP, UNMATCHED_SURROGATE_PAIR_REPLACE)
            .replace(ENCODE_CHARS_REGEXP, encodeURI);
    }

    static compose(middlewares) {
        if (!Array.isArray(middlewares)) throw new TypeError("MIDDLEWARE: Middlewares must be an array");
        for (const fn of middlewares) {
            if (typeof fn !== "function") throw new TypeError("MIDDLEWARE: Middlewares must be functions");
        }

        return (req, res, next) => {
            // last called middleware #
            let index = -1;
            return dispatch(0);
            function dispatch(i) {
                if (i <= index) return Promise.reject(new Error("MIDDLEWARE: next() called too many times (multiple)"));
                index = i;
                let fn = middlewares[i];
                if (middlewares.length === i) fn = next;
                if (!fn) return Promise.resolve();
                try {
                    return Promise.resolve(fn(req, res, () => dispatch(i + 1)));
                } catch (err) {
                    return Promise.reject(err);
                }
            }
        };
    }


}

module.exports = Util;
