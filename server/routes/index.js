const express = require('express')
const axios = require('axios')
const FORECAST = require('../utils/forecast')

const router = express.Router()

/* GET home page. */
router.get('/', function (req, res, next) {
  const APPID = '8db2a7582a49564a54b1336c222fbeb8'
  const city = 'London,GB'
  const units = 'metric'
  const url = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${units}&APPID=${APPID}`

  axios.get(url)
    .then((response) => {
      console.log('AXIOS got data')
      FORECAST.reset()
      const days = FORECAST.parse(response.data)
      console.log(days)
      res.render('index', {
        title: '5 Days View - London Weather Forecast',
        forecast: days
      })
    })
})

module.exports = router
