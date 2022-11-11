const {Router} = require("express");
const userRouter = Router();
const {Show, User} = require("../models");
// middleware
const getUser = require("../middleware/getUser");
const getShow = require("../middleware/getShow");

// The User Router should GET ALL users from the database using the endpoint /users.
userRouter.get("/", async (req, res) => {
    try {
        const allUsers = await User.findAll();

        res.status(200).json({allUsers});
    }
    catch (error) {
        res.status(500).json(error);
    }
})

// The User Router should GET one user from the database using an endpoint.
userRouter.get("/:id", getUser, async (req, res) => {
    try {
        res.status(200).json({user: req.user});
    }
    catch (error) {
        res.status(500).json(error);
    }
})

// The User Router should GET all the shows watched by a user using an endpoint.
userRouter.get("/:id/shows", getUser, async (req, res) => {
    try {
        const userShows = await req.user.getShows();

        res.status(200).json({userShows});
    }
    catch (error) {
        res.status(500).json(error);
    }
})

// The User Router should update and add a show if a user has watched it using an endpoint.
userRouter.put("/:id/shows/:showId", getUser, getShow, async (req, res) => {
    try {
        await req.show.setUser(req.user);
        await req.show.update({userId: req.params.id});

        res.status(200).json({show: req.show});
    }
    catch (error) {
        res.status(501).json(error);
    }
})

module.exports = userRouter;
