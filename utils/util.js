const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

const formatTimeFromTimeStamp = timestamp => {
  if (timestamp){
    var date = new Date(timestamp);
    var YY = date.getFullYear();
    var MM = (date.getMonth() + 1 < 10 ? '0'+(date.getMonth() + 1) : date.getMonth() + 1);
    var DD = (date.getDate() < 10 ? '0'+date.getDate() : date.getDate());
    var hh = (date.getHours() < 10 ? '0'+date.getHours() : date.getHours());
    var mm = (date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes());
    var ss = (date.getSeconds() < 10 ? '0'+date.getSeconds() : date.getSeconds());
    return YY + '-' + MM + '-' + DD + ' ' + hh + ':' + mm + ':' + ss;
  } else {
    return "";
  }
}

const formatDate = function (date){
  date = new Date(date);
  return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
}

const formDateTime = function (date){
  date = new Date(date)
  var hh = (date.getHours() < 10 ? '0'+date.getHours() : date.getHours());
  var mm = (date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes());
  return hh + ':' + mm
}

module.exports = {
  formatTime,
  formatTimeFromTimeStamp,
  formatDate,
  formDateTime,
}
