const {User} = require("../models");
//const express = require("express");
//const getUser = express();

async function getUser (req, res, next) {
    req.user = await User.findByPk(req.params.id);

    if (!req.user) {
        return res.status(404).json("User not found");
    }

    next();
}

module.exports = getUser;
