import express from 'express'
import { deleteAd, getAds, postAd } from '../controller/adController.js';

const router  = express.Router();

router.post('/',postAd)
router.get('/', getAds)
router.delete('/',deleteAd)

export default router