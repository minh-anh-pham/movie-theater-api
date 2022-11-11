const {User} = require("../models");

async function getUser (req, res, next) {
    req.user = await User.findByPk(req.params.id);

    if (!req.user) {
        return res.status(404).json("User not found");
    }

    next();
}

module.exports = getUser;
