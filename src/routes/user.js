const {Router} = require("express");
const userRouter = Router();
const {Show, User} = require("../models");

// The User Router should GET ALL users from the database using the endpoint /users.
userRouter.get("/", async (req, res) => {
    try {
        const allUsers = await User.findAll();
        console.log(allUsers);
        res.status(200).json({allUsers});
    }
    catch (error) {
        res.status(500).json(error);
    }
})

// The User Router should GET one user from the database using an endpoint.
userRouter.get("/:id", async (req, res) => {
    try {
        const userById = await User.findByPk(req.params.id);

        res.status(200).json({userById});
    }
    catch (error) {
        res.status(500).json(error);
    }
})

// The User Router should GET all the shows watched by a user using an endpoint.
userRouter.get("/:id/shows", async (req, res) => {
    try {
        const userById = await User.findByPk(req.params.id);
        const userShows = await userById.getShows();

        res.status(200).json({userShows});
    }
    catch (error) {
        res.status(500).json(error);
    }
})

// The User Router should update and add a show if a user has watched it using an endpoint.
userRouter.put("/:id/shows/:show", async (req, res) => {
    try {
        const userById = await User.findByPk(req.params.id);
        const showById = await Show.findByPk(req.params.show);

        await showById.setUser(userById);
        await showById.update({userId: req.params.id});

        res.status(200).json({showById});
    }
    catch (error) {
        res.status(500).json(error);
    }
})

module.exports = userRouter;
