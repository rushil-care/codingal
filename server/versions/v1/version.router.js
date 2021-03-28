const express = require("express");
const router = express.Router();
const PostsRouter = require("./routes/posts.router");

router.get("/", function (req, res) {
    res.status(200).send({ status: "success", message: "API is working fine." });
});

//All Route Paths

router.use("/posts", PostsRouter);

module.exports = router;
