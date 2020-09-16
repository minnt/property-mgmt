const ParseDate = (input) => {
  var myDate    = new Date(input)
  var month     = myDate.getMonth()
  var date      = myDate.getDate()
  var day       = myDate.getDay()
  var hours     = myDate.getHours()
  var minutes   = myDate.getMinutes()
  var year      = myDate.getFullYear()

  return ({month, date, day, hours, minutes, year})
}

export default ParseDate