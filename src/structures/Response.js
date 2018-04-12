const { ServerResponse } = require("http");
const mime = require("../util/mime");
const util = require("../util/Util");

class Response extends ServerResponse {

    json(data) {
        const json = JSON.stringify(data);
        if (!this.get("Content-Type")) this.set("Content-Type", "application/json");
        return this.send(json);
    }

    status(code) {
        this.statusCode = code;
        return this;
    }

    set(field, value) {
        if ((typeof field === "object" && field !== null) && typeof value === "undefined") {
            for (const key of Object.keys(field)) {
                const val = Array.isArray(field[key]) ? field[key].map(String) : String(field[key]);
                this.setHeader(key, val);
            }
            return this;
        }
        const val = Array.isArray(value) ? value.map(String) : String(value);
        this.setHeader(field, val);
        return this;
    }

    get(field) {
        return this.getHeader(field);
    }

    type(type) {
        const contentType = type.indexOf("/") === -1 ? mime.lookup(type) : type;
        return this.set("Content-Type", contentType);
    }

    send(body) {
        let len = 0;
        let encoding = "";
        let type = "";

        switch (typeof body) {
            case "string": {
                if (!this.get("Content-Type")) this.type("text");
                break;
            }
            case "boolean":
            case "number":
            case "object": {
                if (!body) break;
                if (Buffer.isBuffer(body)) {
                    if (!this.get("Content-Type")) this.type("bin");
                } else {
                    this.json(body);
                }
                break;
            }
        }

        if (typeof body === "string") {
            encoding = "utf8";
            type = this.get("Content-Type");
            // reflect this in content-type
            if (typeof type === "string") this.set("Content-Type", util.setCharset(type, "utf-8"));
        }

        // Set Content-Length
        if (Buffer.isBuffer(body)) len = body.length;
        else if (body.length < 1000) len = Buffer.byteLength(body, encoding);
        body = Buffer.from(body, encoding);
        encoding = undefined;
        len = body.length;
        this.set("Content-Length", len);

        if (this.req.method === "HEAD") this.end();
        else this.end(body, encoding);

        return this;
    }

}

module.exports = Response;
