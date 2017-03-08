/* global FORECAST */

function init (data) {
  const days = FORECAST.parse(data)
  console.log(days)
  const dayEls = document.getElementsByClassName('w-forecast_day')

  for (let i = 0; i < days.length; i++) {
    injectData(dayEls[i], days[i])
  }
}

function injectData (element, data) {
  if (element === undefined) {
    return false
  }

  const WeekDay = element.querySelector('.w-forecast_day-text')
  WeekDay.innerHTML = data.getShortWeek()

  const TempMax = element.querySelector('.w-forecast_temp--max')
  TempMax.innerHTML = `${parseInt(data.temp.max, 10)}&deg;C`

  const TempMin = element.querySelector('.w-forecast_temp--min')
  TempMin.innerHTML = `${parseInt(data.temp.min, 10)}&deg;C`
}

(function () {
  const APPID = '8db2a7582a49564a54b1336c222fbeb8'
  const city = 'London,GB'
  const units = 'metric'

  const script = document.createElement('script')
  script.src = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${units}&APPID=${APPID}&callback=init`
  document.head.appendChild(script)
})()
