const {Router} = require("express");
const showRouter = Router();
const {Show, User} = require("../models");

// The Show Router should GET ALL shows from the database using the endpoint /shows.
showRouter.get("/", async (req, res) => {
    try {
        const allShows = await Show.findAll();

        res.status(200).json({allShows});
    }
    catch (error) {
        res.status(500).json(error);
    }
})

module.exports = showRouter;
