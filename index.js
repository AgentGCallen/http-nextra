module.exports = {
    Piece: require("./src/Router/Piece"),
    Router: require("./src/Router/Router"),
    Server: require("./src/Server"),
    APIServer: require("./src/Server"),
    Request: require("./src/structures/Request"),
    Response: require("./src/structures/Response"),
    constants: require("./src/util/constants"),
    json: require("./src/middlewares/json"),
    version: require("./package.json").version
};
