const zlib = require("zlib");

module.exports = (req) => new Promise((res, rej) => {
    if (req.method !== "POST") return res(true);

    req.body = {};

    const stream = contentStream(req);

    let chunk = "";

    stream.on("data", data => {
        chunk += data;
    });

    stream.on("end", () => {
        try {
            const data = JSON.parse(chunk);
            req.body = data;
            return res(true);
        } catch (err) {
            req.body = {};
        }
    });
});

function contentStream(req) {
    const encoding = (req.headers["content-encoding"] || "identity").toLowerCase();
    const length = req.headers["content-length"];
    let stream;

    switch (encoding) {
        case "deflate":
            stream = zlib.createInflate();
            req.pipe(stream);
            break;
        case "gzip":
            stream = zlib.createGunzip();
            req.pipe(stream);
            break;
        case "identity":
            stream = req;
            stream.length = length;
            break;
        default: return;
    }

    return stream;
}
