function doPost(e) {
  var json = JSON.parse(e.postData.contents);

  //返信するためのトークン取得
  var reply_token = json.events[0].replyToken;
  if (typeof reply_token === 'undefined') {
    return;
  }

  //送られたメッセージ内容を取得
  var message = json.events[0].message.text;

  if (message == "今日は何のゴミの日？") {
    replyTodayGarbageText(reply_token);
  } else if (message == "明日は何のゴミの日？") {
    replyTomorrowGarbageText(reply_token);
  } else if (message == "今月のゴミの日カレンダー") {
    replyThisMonthCalendar(reply_token);
  } else {
    // TODO
  }

  // HTTP 200 OK
  return ContentService.createTextOutput(JSON.stringify({'content': 'post ok'})).setMimeType(ContentService.MimeType.JSON);
}