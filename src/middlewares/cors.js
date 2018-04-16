module.exports = (req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
    return true;
};
