const zlib = require("zlib");

module.exports = (req) => new Promise((resolve, reject) => {
    if (req.method !== "POST") return resolve(true);
    req.body = {};

    const stream = contentStream(req);

    let body = "";

    stream.on("data", chunk => body += chunk); // eslint-disable-line no-return-assign
    stream.on("end", () => {
        try {
            const data = JSON.parse(body);
            req.body = data;
            resolve(data);
        } catch (WhatsThis) {
            req.body = {};
            reject(WhatsThis);
        }
    });
});

function contentStream(req) {
    const length = req.headers["content-length"];
    let stream;
    switch ((req.headers["content-encoding"] || "identity").toLowerCase()) {
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
