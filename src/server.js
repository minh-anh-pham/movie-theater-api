const express = require("express");
const app = express();
const {db} = require("./db/db");

// routes
const userRouter = require("./routes/user");
app.use("/users", userRouter);
const showRouter = require("./routes/show");
app.use("/shows", showRouter);

// parse json format
app.use(express.json());


// init server on port 3000
app.listen(3000, async () => {
    await db.sync();

    console.log("App is listening on port 3000");
})

module.exports = app;
