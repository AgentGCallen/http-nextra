const PARAM_REGEXP = /; *([!#$%&'*+.^_`|~0-9A-Za-z-]+) *= *("(?:[\u000b\u0020\u0021\u0023-\u005b\u005d-\u007e\u0080-\u00ff]|\\[\u000b\u0020-\u00ff])*"|[!#$%&'*+.^_`|~0-9A-Za-z-]+) */g; // eslint-disable-line no-control-regex
const TEXT_REGEXP = /^[\u000b\u0020-\u007e\u0080-\u00ff]+$/; // eslint-disable-line no-control-regex
const TOKEN_REGEXP = /^[!#$%&'*+.^_`|~0-9A-Za-z-]+$/;
const QESC_REGEXP = /\\([\u000b\u0020-\u00ff])/g; // eslint-disable-line no-control-regex
const QUOTE_REGEXP = /([\\"])/g;
const TYPE_REGEXP = /^[!#$%&'*+.^_`|~0-9A-Za-z-]+\/[!#$%&'*+.^_`|~0-9A-Za-z-]+$/;

module.exports.format = (obj) => {
    if (!obj || typeof obj !== "object") throw new TypeError("argument obj is required");

    const { parameters, type } = obj;

    if (!type || !TYPE_REGEXP.test(type)) throw new TypeError("invalid type");

    let string = type;

    // append parameters
    if (parameters && typeof parameters === "object") {
        let param;
        const params = Object.keys(parameters).sort();

        for (let i = 0; i < params.length; i++) {
            param = params[i];
            if (!TOKEN_REGEXP.test(param)) throw new TypeError("invalid parameter name");
            string += `; ${param}=${qstring(parameters[param])}`;
        }
    }

    return string;
};

module.exports.parse = (header) => {
    if (!header) throw new TypeError("argument string is required");

    let index = header.indexOf(";");
    const type = index !== -1 ? header.substr(0, index).trim() : header.trim();

    if (!TYPE_REGEXP.test(type)) throw new TypeError("invalid media type");

    const obj = {
        type: type.toLowerCase(),
        parameters: {}
    };

    // parse parameters
    if (index !== -1) {
        let key;
        let match;
        let value;

        PARAM_REGEXP.lastIndex = index;

        while (match = PARAM_REGEXP.exec(header)) { // eslint-disable-line no-cond-assign
            if (match.index !== index) throw new TypeError("invalid parameter format");

            index += match[0].length;
            key = match[1].toLowerCase();
            [index, key, value] = [match[0].length, match[1].toLowerCase(), match[2]];

            if (value[0] === '"') value = value.substr(1, value.length - 2).replace(QESC_REGEXP, "$1");

            obj.parameters[key] = value;
        }

        if (index !== header.length) throw new TypeError("invalid parameter format");
    }

    return obj;
};

function qstring(val) {
    const str = String(val);
    if (TOKEN_REGEXP.test(str)) return str;
    if (str.length > 0 && !TEXT_REGEXP.test(str)) throw new TypeError("invalid parameter value");
    return `"${str.replace(QUOTE_REGEXP, "\\$1")}"`;
}
