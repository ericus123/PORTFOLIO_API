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

postRoute.post("/create", verify, postValidation, createpostController);

//Get all posts form db

postRoute.get("/getall", getallpostsController);
//Get a single post form db
postRoute.get("/getsingle/:id", getsinglepostController);

//Edit post

postRoute.put("/update/:id", verify, editpostValidation, updatepostController);

//Delete  post

postRoute.delete("/delete/:id", verify, deletepostController);
export default postRoute;
