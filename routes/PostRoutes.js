const express = require("express");

const postControllers = require("../controllers/PostControllers");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router
  .route("/")
  .get(protect, postControllers.getPost)
  .post(protect, postControllers.createPost);

router
  .route("/:id")
  .get(protect, postControllers.getPostById)
  .patch(protect, postControllers.updatePost)
  .delete(protect, postControllers.deletePost);

module.exports = router;
