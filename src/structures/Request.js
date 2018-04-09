const { IncomingMessage } = require("http");
const url = require("url");
const querystring = require("querystring");

class Request extends IncomingMessage {

    get query() {
        if (!this.url) return {};
        const parsedurl = url.parse(this.url);
        return querystring.parse(parsedurl.query);
    }

}

module.exports = Request;
