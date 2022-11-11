const {Show} = require("../models");

async function getShow (req, res, next) {
    req.show = await Show.findByPk(req.params.showId);

    if (!req.show) {
        return res.status(404).json("Show not found");
    }

    next();
}

module.exports = getShow;
