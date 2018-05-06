const { Server, json } = require("../index");

const server = new Server();

server.use(json);
server.use(() => console.log("hello world"));

server.listen(5000, (error) => {
    if (error) console.error("Something happened: ", error);
    else console.log("Server is up!");
});

server.get("text/:text", (req, res, { text }) => {
    if (req.query.json) return res.json({ text });
    return res.send(text);
});

server.get("json", (req, res) => {
    res.status(200).json({
        guildID: "397700693131264000",
        userID: "414512049679237122",
        roles: ["397700693131264000", "397701181419290634", "397713972331282434"],
        joinedTimestamp: 1518991786341,
        lastMessageChannelID: "397701415620837406",
        displayName: "Trident"
    });
});

server.get("/error", (req, res) => res.status(500).json({ error: "YA TWAT" }));

server.get("/auth", (req, res) => {
    const token = req.get("Authorization");
    if (!token) {
        res.json({ message: "You little twat come here before i ban you from discord -b1nzy" });
        return false;
    }
    if (token === "jacz") return true;
}, (req, res) => {
    res.json({ message: "Authorized" });
});

server.post("info", (req, res) => res.status(200).json({ message: "Data recieved", data: req.body }));
