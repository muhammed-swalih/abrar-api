const express = require('express');
const { addPackage, deletePackage, getPackage } = require('../controller/packageController.js');
const multer = require('multer');

const router = express.Router();

const storage = multer.memoryStorage(); // Store the file in memory as a buffer
const upload = multer({ storage });

router.post('/', addPackage)
router.get('/',getPackage)
router.delete('/:id',deletePackage)


module.exports = router;
