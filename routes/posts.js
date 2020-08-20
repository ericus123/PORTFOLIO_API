const router = require("express").Router();
const Post = require("../model/Post");
const verify = require("../middleware/verifyToken");

const {
  postValidation,
  editpostValidation,
} = require("../middleware/validation");
const {
  createpostController,
  getallpostsController,
  getsinglepostController,
  updatepostController,
  deletepostController,
} = require("../controller/posts");
router.post("/create", verify, postValidation, createpostController);

//Get all posts form db

router.get("/getall", getallpostsController);
//Get a single post form db
router.get("/getsingle/:id", getsinglepostController);

//Edit post

router.put("/update/:id", verify, editpostValidation, updatepostController);

//Delete  post

router.delete("/delete/:id", verify, deletepostController);
module.exports = router;
