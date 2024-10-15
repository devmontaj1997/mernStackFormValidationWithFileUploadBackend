import express from "express";
import { createUserData, getData,uniq_user_data } from "../controllers/formValidationController/formValidationController.js";
import { upload} from "../utiles/Multer.js";

// init route

const router = express.Router();


// create router

router.get( "/", getData)
router.post( "/user_data",upload, createUserData)
router.post( "/uniq_user_data", uniq_user_data)


// export router

export default router