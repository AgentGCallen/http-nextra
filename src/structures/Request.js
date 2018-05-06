const { IncomingMessage } = require("http");
const url = require("url");

class Request extends IncomingMessage {

    get _parsedUrl() {
        if (!this.url) return {};
        return url.parse(this.url, true);
    }

    get query() {
        if (!this.url) return {};
        return this._parsedUrl.query;
    }

    get path() {
        if (!this.url) return "";
        return this._parsedUrl.pathname;
    }

    get(name) {
        return this.headers[name.toLowerCase()];
    }

}

module.exports = Request;
