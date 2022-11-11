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

// The Show Router should GET one show from the database using an endpoint.
showRouter.get("/:id", async (req, res) => {
    try {
        const showById = await Show.findByPk(req.params.id);

        res.status(200).json({showById});
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

module.exports = showRouter;
