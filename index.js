module.exports = {
    Piece: require("./src/Router/Piece"),
    Router: require("./src/Router/Router"),
    APIServer: require("./src/APIServer"),
    Request: require("./src/structures/Request"),
    Response: require("./src/structures/Response"),
    constants: require("./src/util/constants"),
    json: require("./src/middlewares/jsonBodyParser.js"),
    cors: require("./src/middlewares/cors"),
    Util: require("./src/util/Util"),
    version: require("./package.json").version
};
