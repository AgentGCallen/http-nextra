const { IncomingMessage } = require("http");
const url = require("url");
const querystring = require("querystring");

class Request extends IncomingMessage {

    get query() {
        if (!this.url) return {};
        const parsedurl = url.parse(this.url);
        return querystring.parse(parsedurl.query);
    }

    get path() {
        if (!this.url) return;
        return url.parse(this.url).pathname;
    }

    get(name) {
        return this.headers[name.toLowerCase()];
    }

}

module.exports = Request;
