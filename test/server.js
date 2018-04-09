const { APIServer } = require("../index");

const server = new APIServer();

server.listen(5000, (error) => {
    if (error) console.error("Something happened: ", error);
    else console.log("Server is up!");
});

server.get("text/:text", (req, res, { text }) => {
    console.log(res.constructor);
    if (req.query.json) return res.json({ text });
    return res.end(text);
});
