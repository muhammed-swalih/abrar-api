const express = require('express');
const { deleteAd, getAds, postAd } = require('../controller/adController.js');


const router  = express.Router();

router.post('/',postAd)
router.get('/', getAds)
router.delete('/',deleteAd)

module.exports =  router