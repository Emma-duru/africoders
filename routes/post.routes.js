const router = require("express").Router();
const postControllers = require("../controllers/post.controllers");
const commentControllers = require("../controllers/comment.controllers");
const { requireAuth } = require("../middleware/auth");

router.get("/", postControllers.posts_get);
router.get("/create", requireAuth, postControllers.create_get);
router.post("/create", requireAuth, postControllers.create_post);
router.get("/:slug", postControllers.post_detail);
router.get("/:slug/edit", requireAuth, postControllers.edit_get);
router.put("/:slug", requireAuth, postControllers.edit_post);
router.delete("/:slug", requireAuth, postControllers.delete_post);
router.get("/posts/:category", postControllers.category_get);

// Comment routes
router.post("/:slug/create", requireAuth, commentControllers.comment_create);
router.delete("/:slug/:id", requireAuth, commentControllers.comment_delete);

module.exports = router;
