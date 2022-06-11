import auth from '@react-native-firebase/auth'

export const checkValidEmail = email => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}
export const getVimeoId = url => {
  var firstPart = url.split('?')[0].split('/')
  return firstPart[firstPart.length - 1]
}

export const checkValidPassword = password => {
  var re = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/
  return re.test(password)
}
export const getUserId = () => {
  return auth().currentUser ? auth().currentUser.uid : null
}
export const getAvatarTitle = string => {
  const strArray = string.trim().split(' ')
  return strArray.length < 2
    ? strArray[0][0]
    : strArray[1][0] && strArray[1][0].length !== '0'
    ? strArray[0][0] + strArray[1][0]
    : strArray[0][0]
}

export const formatDate = date => {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear()

  if (month.length < 2) month = '0' + month
  if (day.length < 2) day = '0' + day

  return [day, month, year].join('-')
}

export const checkValueInArray = (array, valueToBeFound, key) => {}

export const getCurrentTime = () => {
  return new Date()
}
export const buildDocKey = arrays => {
  return arrays.sort().join(':')
}

export const convertSecondsToDate = date => {
  if (!date?.seconds) return new Date().getTime()
  return new Date(date.seconds * 1000).getTime()
}

export function formatAMPM (date) {
  if (typeof date === 'number') date = new Date(date)
  var hours = date.getHours()
  var minutes = date.getMinutes()
  var ampm = hours >= 12 ? 'pm' : 'am'
  hours = hours % 12
  hours = hours ? hours : 12 // the hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes
  var strTime = hours + ':' + minutes + ' ' + ampm
  return strTime
}

export function timeSince (date) {
  var seconds = Math.floor((new Date() - date) / 1000)

  var interval = seconds / 31536000

  const days = seconds / 86400
  const hours = seconds / 3600
  const minutes = seconds / 60

  let dateString = ''
  let time = ''
  if (days > 1 && days < 2) {
    dateString = 'Yesterday'
    time = formatAMPM(date)
  } else if (hours > 1 && hours < 24) {
    dateString = 'Today'
    time = Math.floor(hours) + ' h'
  } else if (minutes > 1 && minutes < 59) {
    dateString = 'Today'
    time = Math.floor(minutes) + ' m'
  } else if (minutes < 1) {
    dateString = 'Today'
    time = Math.floor(seconds) + ' s'
  } else {
    dateString = formatDate(date)
    time = formatAMPM(date)
  }
  return {
    date: dateString,
    time: time,
  }
}

export const isTimeDifference24Hours = (date1, date2) => {
  var seconds = Math.floor((date2 - date1) / 1000)

  const hours = seconds / 3600

  console.log(hours)
  return hours > 24
}

export const findInArray = (array, itemToFind, key) => {
  return array.findIndex(item => item[key] === itemToFind)
}

export function secondsToHms (d) {
  d = Number(d)
  var h = Math.floor(d / 3600)
  var m = Math.floor((d % 3600) / 60)
  var s = Math.floor((d % 3600) % 60)

  var hDisplay = h > 0 ? h + (h == 1 ? ' h ' : ' , ') : ''
  var mDisplay = m > 0 ? m + (m == 1 ? ' m ' : ' m ') : ''
  var sDisplay = s > 0 ? s + (s == 1 ? ' s' : ' s') : ''
  return hDisplay + mDisplay + sDisplay
}

export const convertCardNoToPrivate = str => {
  return str.replace(/.(?=.{4,}$)/g, '*')
}

export const convertDockKeyToContentIdTypeUid = dockKey => {
  return dockKey.split('_')
}

function randomIntFromInterval (min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export const generateUserNameFromEmail = emailAddress => {
  const nameReplace = emailAddress.replace(/@.*$/, '')
  const randomNumber = randomIntFromInterval(1, 5000).toString()
  return `${nameReplace}${randomNumber}`
}
export function ordinal_suffix_of (i) {
  var j = i % 10,
    k = i % 100
  if (j == 1 && k != 11) {
    return i + 'st'
  }
  if (j == 2 && k != 12) {
    return i + 'nd'
  }
  if (j == 3 && k != 13) {
    return i + 'rd'
  }
  return i + 'th'
}
function timeDiffCalc (dateFuture, dateNow) {
  let diffInMilliSeconds = Math.abs(dateFuture - dateNow) / 1000

  // calculate days
  const days = Math.floor(diffInMilliSeconds / 86400)
  diffInMilliSeconds -= days * 86400

  // calculate hours
  const hours = Math.floor(diffInMilliSeconds / 3600) % 24
  diffInMilliSeconds -= hours * 3600

  // calculate minutes
  const minutes = Math.floor(diffInMilliSeconds / 60) % 60
  diffInMilliSeconds -= minutes * 60

  let difference = ''
  if (days > 0) {
    difference += days === 1 ? `${days} day, ` : `${days} days, `
  }

  difference +=
    hours === 0 || hours === 1 ? `${hours} hour, ` : `${hours} hours, `

  difference +=
    minutes === 0 || hours === 1 ? `${minutes} minutes` : `${minutes} minutes`

  return difference
}

export function abbreviateNumber (value) {
  var newValue = value
  if (value >= 1000) {
    var suffixes = ['', 'k', 'm', 'b', 't']
    var suffixNum = Math.floor(('' + value).length / 3)
    var shortValue = ''
    for (var precision = 2; precision >= 1; precision--) {
      shortValue = parseFloat(
        (suffixNum != 0
          ? value / Math.pow(1000, suffixNum)
          : value
        ).toPrecision(precision),
      )
      var dotLessShortValue = (shortValue + '').replace(/[^a-zA-Z 0-9]+/g, '')
      if (dotLessShortValue.length <= 2) {
        break
      }
    }
    if (shortValue % 1 != 0) shortValue = shortValue.toFixed(1)
    newValue = shortValue + suffixes[suffixNum]
  }
  return newValue
}
export function setToLastSunday (d) {
  d.setDate(d.getDate() - d.getDay())
  return d
}
export const timeDifference = timeZone => {
  const currentDate = convertDateToTimeZone(new Date(), 'Europe/London')
  const lastSunday = setToLastSunday(
    convertDateToTimeZone(new Date(), 'Europe/London'),
  )
  const nextSunday = lastSunday
  nextSunday.setDate(lastSunday.getDate() + 7)
  nextSunday.setHours(23, 59, 0)
  // const endDate = convertDateToTimeZone('','Europe/London)
  return timeDiffCalc(nextSunday, currentDate)
}

export const convertDateToTimeZone = (date, tzString) => {
  return new Date(
    (typeof date === 'string' ? new Date(date) : date).toLocaleString('en-US', {
      timeZone: tzString,
    }),
  )
}

export const convertDateToYMDHMS = date => {
  var date = new Date(date)

  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  var hours = date.getHours()
  var minutes = date.getMinutes()
  var seconds = date.getSeconds()
  return (
    year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds
  )
}

export const stringTruncate = (str, n) => {
  return str.length > n ? str.substr(0, n - 1) + ' ....' : str
}

export const changeMinutesToMins = str => {
  return str.split(' ')[0] + ' mins'
}

export const isDateToday = date => {
  const today = new Date()
  return (
    today.getDate() === date.getDate() &&
    today.getFullYear() === date.getFullYear() &&
    today.getMonth() === date.getMonth()
  )
}
