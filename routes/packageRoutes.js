import express from 'express'
import { addPackage, deletePackage, getPackage } from '../controller/packageController.js';
import multer from 'multer';
const router = express.Router();

const storage = multer.memoryStorage(); // Store the file in memory as a buffer
const upload = multer({ storage });

router.post('/', addPackage)
router.get('/',getPackage)
router.delete('/:id',deletePackage)


export default router