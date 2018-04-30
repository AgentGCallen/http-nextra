const { Server, METHODS, ServerResponse, IncomingMessage } = require("http");
const Response = require("./structures/Response");
const Request = require("./structures/Request");
const Router = require("./Router/Router");
const Util = require("./util/Util");

class APIServer extends Server {

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

        IncomingMessage.prototype = new this.Request(APIServer);
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

        if (!this.listenerCount("error")) this.on("error", this.onError);

        const fn = Util.compose(this.middlewares);
        const handle = async () => {
            try {
                await this.router.runPath(req.path.slice(1).split("/"), req, res, {});
            } catch (error) {
                this.emit("error", error);
            }
        };
        fn(req, res).then(handle).catch(error => this.emit("error", error));
    }

}

// Add all the aliases for better usage
for (const method of METHODS) {
    Object.defineProperty(APIServer.prototype, method.toLowerCase(), {
        value: function (...args) { // eslint-disable-line func-names
            return this.router[method.toLowerCase()](...args);
        }
    });
}

module.exports = APIServer;
