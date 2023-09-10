const packageModel = require('../models/packageModel.js');
const multer = require('multer');
const uuidv4 = require('uuid').v4;
const bucket = require('../firebase.config.js');


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

exports.addPackage = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.log(err);
    } else {
      const uniqueFilename = uuidv4();
      const filePath = Buffer.from(req.file.path);
      const destination = `images/${req.file.originalname + uniqueFilename}`;

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

      const newPackage = new packageModel({
        title: req.body.title,
        price: req.body.price,
        days: req.body.days,
        pic: {
          data: filePath,
          contentType: req.file.mimetype,
        },
        description: req.body.description,
        special: req.body.special,
        picUrl: url,
      });

      try {
        const savedPackage = {
          title: req.body.title,
          price: req.body.price,
          days: req.body.days,
          description: req.body.description,
          picUrl: url,
          special: req.body.special,
          _id : newPackage._id
        };

        
        await packageModel.create(savedPackage);
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

exports.deletePackage = async (req, res) => {
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

exports.getPackage = async (req, res) => {
  try {
    const response = await packageModel.find();
    const otherDocs = response.map((doc) => {
      const { pic, ...other } = doc.toObject();
      return other;
    });
    res.status(200).json(otherDocs);
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
};

