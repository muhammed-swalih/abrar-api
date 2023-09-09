import multer from "multer";
import path from "path";
import ad from "../models/ad.js";

import { v4 as uuidv4 } from "uuid";
import bucket from "../firebase.config.js";
const Storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({
  storage: Storage,
}).single("pic");



export const postAd = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.log(err);
    } else {
      const uniqueFilename = uuidv4();
      const filePath = Buffer.from(req.file.path);
      const destination = `ads/${req.file.originalname + uniqueFilename}`;

      

      bucket
        .upload(filePath, {
          destination: destination,
          contentType: req.file.mimetype,
          public: true, // Make the file publicly accessible (optional)
        })
        .then(() => {
          console.log("Image uploaded successfully.");
        })
        .catch((error) => {
          console.error("Error uploading image:", error);
        });

      const file = bucket.file(destination);

      const [url] = await file.getSignedUrl({
        action: "read",
        expires: "01-01-2028", // Set an expiration date or duration as needed
      });

      console.log("Download URL:", url);

      const newPackage = new ad({
        pic: {
          data: filePath,
          contentType: "image/jpeg || image/png",
        },
      });

      try {
        const savedPackage = {
          picUrl: url,
        };

        await ad.create(savedPackage);

        res.status(200).json(savedPackage);
      } catch (error) {
        res
          .status(500)
          .json(
            "The image file must be jpeg or png file . And choose medium or low quality image"
          );
      }
    }
  });
};

export const getAds = async (req, res) => {
  try {
    const getData = await ad.find().select("-pic");

    console.log(getData);
    res.status(200).json(getData);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
};

export const deleteAd = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(500).json("please provide the id");
  }

  try {
    await ad.findByIdAndDelete(id);
    res.status(200).json("this ad has been deleted");
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
};
export default bucket