const express = require('express')
const router = express.Router()
const contentfulCtrl = require('../controllers/contentful')

router.get('*', contentfulCtrl.getPage, (req, res, next) => res.render('layouts/page'))

module.exports = router;
