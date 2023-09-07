import packageModel from "../models/packageModel.js";
import multer from "multer";
import path from "path";

// Set up multer for file uploads
const Storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({
  storage: Storage,
}).single("pic");

export const addPackage = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log(req.file);
      const image = Buffer.from(req.file.path);
      console.log(image);
      const newPackage = new packageModel({
        title: req.body.title,
        price: req.body.price,
        days: req.body.days,
        pic: {
          data: image,
          contentType: "image/jpeg || image/png",
        },
        description: req.body.description,
        special: req.body.special,
      });

      try {
        const imageURL = `${req.protocol}://${req.get(
          "host"
        )}/uploads/${encodeURIComponent(req.file.originalname)}`;

        const savedPackage = {
          title: req.body.title,
          price: req.body.price,
          days: req.body.days,
          pic: {
            data: image,
            contentType: "image/jpeg || image/png",
          },
          description: req.body.description,
          picUrl: imageURL,
          special: req.body.special,
        };

        await packageModel.create(savedPackage);

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

export const deletePackage = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.status(500).json("please give the id to delete a package");
    return;
  }

  try {
    await packageModel.findByIdAndDelete(id);
    res.status(200).json("this package has been deleted");
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
};

export const getPackage = async (req, res) => {
  try {
    const response = await packageModel.find();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
};
