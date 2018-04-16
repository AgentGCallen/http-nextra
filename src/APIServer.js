const { Server, METHODS, ServerResponse, IncomingMessage } = require("http");
const Response = require("./structures/Response");
const Request = require("./structures/Request");
const Router = require("./Router/Router");

ServerResponse.prototype = new Response(Request);
IncomingMessage.prototype = new Request(Server);

class APIServer extends Server {

    constructor(options = {}) {
        super(options.requestListener || (async (request, response) => {
            request.res = response;
            response.req = request;
            if (options.middlewares) {
                for (const middleware of options.middlewares) await middleware(request, response);
            }
            this.router.runPath(request.path.slice(1).split("/"), request, response, {});
        }));

        /**
		 * The main router
		 * @since 0.0.1
		 * @type {Router}
		 */
        this.router = new Router(this, "/");
    }

}

module.exports = APIServer;

// Add all the aliases for better usage
for (const method of METHODS) {
    Object.defineProperty(APIServer.prototype, method.toLowerCase(), {
        value: function (...args) { // eslint-disable-line func-names
            return this.router[method.toLowerCase()](...args);
        }
    });
}
