const { Server: HTTPServer, METHODS, ServerResponse, IncomingMessage } = require("http");
const Response = require("./structures/Response");
const Request = require("./structures/Request");
const Router = require("./Router/Router");
const AsyncFunction = (async () => ({})).constructor;

/**
 * The base Server
 * @extends {HTTPServer}
 * @example
 *  const server = new Server();
 *  server.listen(3000);
 */
class Server extends HTTPServer {

    /**
     * @typedef {Object} ServerOptions
     * @property {Request} [request=Request] Extended Request class
     * @property {Response} [response=Response] Extended Response class
     * @property {Function} [onError] Error handler
     */

    /**
     * Server constructor
     * @param {ServerOptions} [options=ServerOptions] The options for the server
     */
    constructor(options = {}) {
        super();

        /**
		 * The main router
		 * @since 0.0.1
		 * @type {Router}
		 */
        this.router = new Router(this, "/");

        /**
         * All middlewares that are loaded
         * @type {Array<Function>}
         */
        this.middlewares = [];
        /**
         * The request class for the Server
         * @type {Request}
         */
        this.Request = options.request || Request;
        /**
         * The response class for the Server
         * @type {Response}
         */
        this.Response = options.response || Response;
        /**
         * The onError function
         * @type {?Function}
         * @param {Error} error the error
         * @returns {*}
         */
        this.onError = options.onError || (error => console.error(error.stack || error.message || error));

        IncomingMessage.prototype = new this.Request(Server);
        ServerResponse.prototype = new this.Response(Request);

        Object.defineProperty(IncomingMessage.prototype, "server", { value: this });
        Object.defineProperty(ServerResponse.prototype, "server", { value: this });

        this.on("request", this._handler.bind(this));
    }

    use(fn) {
        if (typeof fn !== "function") throw new TypeError("MIDDLEWARE: Middleware must be a function");
        this.middlewares.push(fn);
        return this;
    }

    async _handler(req, res) {
        Object.defineProperty(req, "res", { value: res, enumerable: false });
        Object.defineProperty(res, "req", { value: req, enumerable: false });

        if (!this.listenerCount("error") && this.onError !== null) this.on("error", this.onError);

        Server._handleMiddleware(this.middlewares, req, res).then(async () => {
            try {
                await this.router.runPath(req.path.slice(1).split("/"), req, res, {});
            } catch (error) {
                this.emit("error", error);
            }
        }).catch(error => this.emit("error", error));
    }

    static _handleMiddleware(middlewares, req, res) {
        if (!Array.isArray(middlewares)) throw new TypeError("MIDDLEWARE: Middlewares must be an array");
        if (middlewares.some(fn => typeof fn !== "function")) throw new TypeError("MIDDLEWARE: Middlewares must be functions");

        middlewares.forEach((fn, i) => {
            if (!(fn instanceof AsyncFunction)) middlewares[i] = (...args) => Promise.resolve(fn(...args));
        });

        const errors = [];
        return Promise.all(middlewares.map(fn => fn(req, res).catch(error => errors.push(error)))).catch(() => errors[0]);
    }

}

// Add all the aliases for better usage
for (const method of METHODS) {
    Object.defineProperty(Server.prototype, method.toLowerCase(), {
        value: function (...args) { // eslint-disable-line func-names
            return this.router[method.toLowerCase()](...args);
        }
    });
}

module.exports = Server;
