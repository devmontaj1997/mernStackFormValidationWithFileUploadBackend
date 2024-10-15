import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import cors from "cors";
import router from "./routes/formValidationRouter.js";
import asyncErrorHandler from "./errorHandler/asyncErrorHandler.js";

// environment varible

dotenv.config();

const PORT = process.env.PORT || 6060;
// init express

const app = express();
// express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Allow all origins
//

// If you need to allow specific origins:
//const allowedOrigins = ['http://localhost:3000', 'https://yourfrontenddomain.com'];
app.use(cors({
    origin: ['http://localhost:3000', "http://localhost:4173", "https://mern-stack-form-validation-with-file-upload-font-end.vercel.app"],
    credentials: true,
  }))

// use router

app.use("/api/v1/formValidation", router)

// use Error Handler
app.use(asyncErrorHandler)
// listen server
app.listen(PORT, () =>{
    console.log(`server is Runing On ${PORT}`.bgGreen.black);
    
})
