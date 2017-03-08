/* global FORECAST */

function init (data) {
  const days = FORECAST.parse(data)
  const dayEls = document.getElementsByClassName('w-forecast_day')

  for (let i = 0; i < days.length; i++) {
    injectData(dayEls[i], days[i])
  }
}

function injectData (element, data) {
  if (element === undefined) {
    return false
  }

  const weekDay = element.querySelector('.w-forecast_day-text')
  weekDay.innerHTML = data.getShortWeek()

  const tempMax = element.querySelector('.w-forecast_temp--max')
  tempMax.innerHTML = `${parseInt(data.temp.max, 10)}&deg;C`

  const tempMin = element.querySelector('.w-forecast_temp--min')
  tempMin.innerHTML = `${parseInt(data.temp.min, 10)}&deg;C`

  const windSpeed = element.querySelector('.w-forecast_wind--speed')
  windSpeed.innerHTML = `${data.wind.speed.avg().toFixed(2)}m/s`

  const cloudCoverage = element.querySelector('.w-forecast_clouds--cover')
  cloudCoverage.innerHTML = `${parseInt(data.cloudCoverage.avg(), 10)}%`

  const precipitation = element.querySelector('.w-forecast_precip--qt')
  precipitation.innerHTML = `${parseInt(data.precipitation.avg(), 10)}mm`
}

(function () {
  const APPID = '8db2a7582a49564a54b1336c222fbeb8'
  const city = 'London,GB'
  const units = 'metric'

  const script = document.createElement('script')
  script.src = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${units}&APPID=${APPID}&callback=init`
  document.head.appendChild(script)
})()
