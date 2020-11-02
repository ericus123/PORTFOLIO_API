import { Router } from "express";
import verify from "../middleware/verifyToken";

const postRoute = new Router();
import { postValidation, editpostValidation } from "../middleware/validation";
import {
  createpostController,
  getallpostsController,
  getsinglepostController,
  updatepostController,
  deletepostController,
} from "../controller/posts";

postRoute.post("/", verify, postValidation, createpostController);

//Get all posts form db

postRoute.get("/", getallpostsController);
//Get a single post form db
postRoute.get("/:id", getsinglepostController);

//Edit post

postRoute.put("/:id", verify, editpostValidation, updatepostController);

//Delete  post

postRoute.delete("/:id", verify, deletepostController);
export default postRoute;
