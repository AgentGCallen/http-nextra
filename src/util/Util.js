const contentType = require("./content-type");

class Util {

    static setCharset(type, charset) {
        const parsed = contentType.parse(type);
        parsed.parameters.charset = charset;
        return contentType.format(parsed);
    }

}

module.exports = Util;
