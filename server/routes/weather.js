const express = require('express')
const router = express.Router()

router.get('/', function (req, res, next) {
  // not implemented
  res.sendStatus(501)
})

router.get('/forecast/:day', (req, res) => {
  // not implemented
  res.sendStatus(501)
})

router.get('/forecast5', (req, res) => {
  // return fetched data
  res.json({})
})

module.exports = router
