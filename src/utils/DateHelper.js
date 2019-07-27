class DateHelper {
  static getDayCount(s, e) {
    let startDate = new Date(s);
    let endDate = new Date(e);
    let dayCount = Math.abs(endDate - startDate) / 1000 / 60 / 60 / 24;
    return dayCount;
  }

  static getAllDaysBetween(s, e) {
    let dateArray = [];
    let dayCount = this.getDayCount(s, e);
    let startDate = new Date(s);
    dateArray.push(new Date(startDate));
    for (let i = 1; i <= dayCount; i++) {
      dateArray.push(new Date(startDate.getTime() + i * 60 * 60 * 24 * 1000));
    }
    return dateArray;
  }

  static format(date, fmt) {
    var o = {
      "M+": date.getMonth() + 1, //月份
      "d+": date.getDate(), //日
      "h+": date.getHours(), //小时
      "m+": date.getMinutes(), //分
      "s+": date.getSeconds(), //秒
      "q+": Math.floor((date.getMonth() + 3) / 3), //季度
      S: date.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        (date.getFullYear() + "").substr(4 - RegExp.$1.length)
      );
    for (var k in o)
      if (new RegExp("(" + k + ")").test(fmt))
        fmt = fmt.replace(
          RegExp.$1,
          RegExp.$1.length == 1
            ? o[k]
            : ("00" + o[k]).substr(("" + o[k]).length)
        );
    return fmt;
  }
}

export default DateHelper;
