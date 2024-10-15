import expressAsyncHandler from "express-async-handler";
import { PrismaClient } from "@prisma/client";
import { isEmail, isPhone } from "../../helpers/helpers.js";
import { fileUpload } from "../../utiles/Cloudenary.js";

const prisma = new PrismaClient();

// create formValidation Controllers
/**
 * @description: this formValidation get Controller
 * @route: /api/v1/formValidation
 * @access: public
 * @method: get
 */

export const getData = expressAsyncHandler(async (req, res) => {
  const allDate = await prisma.User.findMany();
  res.status(200).json({ message: " Here is all users" });
});
/**
 * @description: this formValidation create user data Controller
 * @route: /api/v1/formValidation/user_data
 * @access: public
 * @method: post
 */

export const createUserData = expressAsyncHandler(async (req, res) => {
  const { name, email, phone, textArea, compuerParts, degitalServices} =
    req.body;
     

  if (!name) {
    return res.status(400).json({ message: "Name  is Required" });
  }
  if (!email) {
    return res.status(400).json({ message: "Email  is Required" });
  }

  // check isemail or not

  const validEmail = isEmail(email);
  if (!validEmail) {
    return res.status(400).json({ message: "Pls Use Valid Email Address" });
    
  }
  // check isPhone or not

  const validPhone = isPhone(phone);
  if (!validPhone) {
    return res.status(400).json({ message: "Pls Use Valid Phone Number" });
    
  }

  const alreadyExistEmail = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (alreadyExistEmail) {
    return res.status(400).json({ message: "This Email Already Exit" });
  }
 
  // Access the single file (photo) and multiple files (gallery)
  const photo = req.files['photo'] ? req.files['photo'][0] : null;
  const gallery = req.files['gallery'] || [];
  
  

 let photoUrl = null;
 let galleryUrls = [];

 // Upload the photo to Cloudinary if it exists
 if (photo) {
   const photoUpload = await fileUpload(photo.path, {
     folder: "user_photos",
   });
   photoUrl = photoUpload.secure_url;  // Get the secure URL of the uploaded photo
 }

 // Upload the gallery images to Cloudinary
 if (gallery.length > 0) {
  const uploadPromises = gallery.map(async (file) => {
    const result = await fileUpload(file.path, {
      folder: "user_gallery",
    });
    return result.secure_url;  // Return the secure URL of the uploaded image
  });

  // Wait for all uploads to complete
  galleryUrls = await Promise.all(uploadPromises);
}

  const createData = await prisma.User.create({
    data: {
      name,
      email,
      phone,
      textArea,
      photo: photoUrl, 
      gallery: galleryUrls, 
      compuerParts,
      degitalServices,
    },
  });
  res
    .status(200)
    .json({ createData, message: "SuccessFully Your Data submited" });
});


/**
 * @description: this formValidation uniq user data Controller
 * @route: /api/v1/formValidation/uniq_user_data
 * @access: public
 * @method: post
 */

export const uniq_user_data = expressAsyncHandler(async (req, res) => {
  const {searchEmail} = req.body;

  if (!searchEmail) {
    return res.status(400).json({ message: "Email is Required" });
  }

  const uniqUser = await prisma.user.findFirst({
    where: { email: searchEmail },
  });

  if (!uniqUser) {
    return res.status(404).json({ message: "This Email doesn't Exist" });
  }

  res.status(200).json({ uniqUser, message: "Here is Your Data" });
});

