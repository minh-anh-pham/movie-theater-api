const {Router} = require("express");
const userRouter = Router();
const {User} = require("../models");

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

module.exports = userRouter;
