const {Router} = require("express");
const showRouter = Router();
const {Show, User} = require("../models");

// middleware
const getUser = require("../middleware/getUser");
const getShow = require("../middleware/getShow");

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

// The Show Router should GET one show from the database using an endpoint.
showRouter.get("/:showId", getShow, async (req, res) => {
    try {
        res.status(200).json({show: req.show});
    }
    catch (error) {
        res.status(500).json(error);
    }
})

// The Show Router should get shows of a specific genre using an endpoint.
showRouter.get("/genres/:genreInput", async (req, res) => {
    try {
        // format user input so first letter is capitalised
        const firstLetter = req.params.genreInput.charAt(0).toUpperCase();

        const restOfInput = req.params.genreInput.slice(1).toLowerCase();

        const input = firstLetter + restOfInput;

        const showByGenre = await Show.findAll({where: {genre: input}});

        res.status(200).json({showByGenre});
    }
    catch (error) {
        res.status(500).json(error);
    }
})

// The Show Router should update a rating on a specific show using an endpoint.
showRouter.put("/:showId/watched", async (req, res) => {
    try {
        const showById = await Show.findByPk(req.params.id);

        await showById.update(req.body);

        res.status(200).json({showById});
    }
    catch (error) {
        res.status(501).json(error);
    }
})

// The Show Router should update the status on a specific show from “canceled” to “on-going” or vice versa using an endpoint.
showRouter.put("/:showId/updates", async (req, res) => {
    try {
        const showById = await Show.findByPk(req.params.id);

        if (showById.status === "cancelled") {
            await showById.update({status: "on-going"});
        }
        else if (showById.status === "on-going") {
            await showById.update({status: "cancelled"});
        }
        else {
            throw new Error("Show's status is not cancelled or on-going?!");
        }

        res.status(200).json({showById});
    }
    catch (error) {
        res.status(501).json(error);
    }
})


// The Show Router should be able to delete a show.
showRouter.delete("/:showId", async (req, res) => {
    try {
        const showById = await Show.findByPk(req.params.id);

        await showById.destroy();
    }
    catch (error) {
        res.status(501).json(error);
    }
})

module.exports = showRouter;
