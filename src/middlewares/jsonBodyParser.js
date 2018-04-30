const zlib = require("zlib");

module.exports = async (req) => {
    if (req.method !== "POST") return;
    req.body = {};

    const stream = contentStream(req);

    let body = "";

    for await (const chunk of stream) body += chunk;
    try {
        const data = JSON.parse(body);
        req.body = data;
    } catch (WhatsThis) {
        req.body = {};
    }
};

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
