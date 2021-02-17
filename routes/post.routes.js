const router = require("express").Router();
const postControllers = require("../controllers/post.controllers");

router.get("/", postControllers.posts_get);

module.exports = router;
