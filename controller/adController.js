import multer from "multer";
import path from "path";
import ad from "../models/ad.js";

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
      console.log(req.file);
      const image = Buffer.from(req.file.path);
      console.log(image);
      const newPackage = new ad({
        pic: {
          data: image,
          contentType: "image/jpeg || image/png",
        },
      });

      try {
        const imageURL = `${req.protocol}://${req.get(
          "host"
        )}/uploads/${encodeURIComponent(req.file.originalname)}`;

        const savedPackage = {
          pic: {
            data: image,
            contentType: "image/jpeg || image/png",
          },
          picUrl: imageURL,
        };

        await ad.create(savedPackage);

        res.status(200).json({ ...newPackage.toObject(), pic: imageURL });
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

export const getAds = async(req,res) => {
    
    try {
        const getData = await ad.find()
        res.status(200).json(getData)
    } catch (error) {
        res.status(500).json(error)
        console.log(error);
    }
}

export const deleteAd = async(req,res) => {
    const {id} = req.params;

    if(!id){
        return res.status(500).json("please provide the id")
    }

    try {
        await ad.findByIdAndDelete(id)
        res.status(200).json("this ad has been deleted")
    } catch (error) {
        res.status(500).json(error)
        console.log(error);
    }
}
