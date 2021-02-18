const router = require("express").Router();
const postControllers = require("../controllers/post.controllers");
const commentControllers = require("../controllers/comment.controllers");

router.get("/", postControllers.posts_get);
router.get("/create", postControllers.create_get);
router.post("/create", postControllers.create_post);
router.get("/:slug", postControllers.post_detail);
router.get("/:slug/edit", postControllers.edit_get);
router.put("/:slug", postControllers.edit_post);
router.delete("/:slug", postControllers.delete_post);
router.get("/posts/:category", postControllers.category_get);

// Comment routes
router.post("/:slug/create", commentControllers.comment_create);
router.delete("/:slug/:id", commentControllers.comment_delete);

module.exports = router;
