// This specific module deals with the data that is received by Open Weather Map

const FORECAST = (function () {
  let days = []
  function Day () {
    this.date = null // unix timestamp
    this.temp = {
      max: null,
      min: null
    }
    this.wind = {
      speed: null,
      direction: {
        degrees: null,
        abbr: null
      }
    }
    this.cloudCoverage = {
      avg: function () {
        let total = 0
        for (let i = 0; i < this.cloudCoverage.timed.length; i++) {
          total += this.cloudCoverage.timed[i]
        }
        return total / this.cloudCoverage.timed.length
      },
      timed: []
    }
    this.precipitation = {
      avg: function () {
        let total = 0
        for (let i = 0; i < this.precipitation.timed.length; i++) {
          total += this.precipitation.timed[i]
        }
        return total / this.precipitation.timed.length
      },
      timed: []
    }
  }
  Day.prototype.init = function init (data) {
    this.date = new Date(data.dt * 1000)
    this.temp.max = data.main.temp_max
    this.temp.min = data.main.temp_min
    this.wind.speed = data.wind.speed
    this.wind.direction.degrees = data.wind.deg
    this.cloudCoverage.timed.push(data.clouds.all)
    this.precipitation.timed.push(data.rain['3h'] || 0)
  }
  Day.prototype.update = function update (data) {
    if (this.temp.max < data.main.temp_max) {
      this.temp.max = data.main.temp_max
    }
    if (this.temp.min > data.main.temp_min) {
      this.temp.min = data.main.temp_min
    }
    this.cloudCoverage.timed.push(data.clouds.all)
    this.precipitation.timed.push(data.rain['3h'] || 0)
  }
  Day.prototype.getShortWeek = function getShortWeek () {
    const weekDaysAbbr = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    // this needs to cater for current locale, defaults to client locale (assuming UTC)
    return weekDaysAbbr[this.date.getDay()]
  }

  function parseData (data) {
    let prevDay = null

    if (!data || !data.list || data.list.constructor !== Array) {
      return []
    }

    for (let i = 0; i < data.list.length; i++) {
      let currDay
      let currDate = new Date(data.list[i].dt * 1000)

      if (prevDay === null || currDate.getDay() !== prevDay.date.getDay()) {
        // new day to parse
        currDay = new Day()
        currDay.init(data.list[i])
        prevDay = currDay
        days.push(currDay)
      } else {
        // we just need to update what we already have
        currDay = prevDay
        currDay.update(data.list[i])
      }
    }
    return days
  }

  function reset () {
    days = []
  }

  return {
    parse: parseData,
    reset: reset
  }
})()

if (module.exports) {
  module.exports = FORECAST
}
