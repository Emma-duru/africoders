const router = require("express").Router();
const postControllers = require("../controllers/post.controllers");

router.get("/", postControllers.posts_get);
router.get("/create", postControllers.create_get);
router.post("/create", postControllers.create_post);
router.get("/:slug", postControllers.post_detail);
router.get("/:slug/edit", postControllers.edit_get);
router.put("/:slug/edit", postControllers.edit_post);

module.exports = router;
