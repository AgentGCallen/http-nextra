const { ServerResponse } = require("http");

class Response extends ServerResponse {

    json(data) {
        this.writeHead(200, { "Content-Type": "application/json" });
        return this.end(JSON.stringify(data));
    }

}

module.exports = Response;
