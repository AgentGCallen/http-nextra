const { mimetypes } = require("./constants");
const mimeOfBuffer = require("./mimeOfBuffer.js");

module.exports.buffer = buffer => {
    const ret = mimeOfBuffer(buffer);
    return ret ? ret.mime : mimetypes.bin;
};

module.exports.lookup = ext => mimetypes[ext.replace(/^\./, "")] || mimetypes.bin;
