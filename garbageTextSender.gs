/* 定期処理：
 * 毎日07:00→今日と明日のゴミをお知らせ
 * 毎日19:00→明日のゴミをお知らせ
 */

/**
 * 今日のゴミの日テキストをフォロワー全員に送信
 */
function broadcastTodayGarbageText() {
  broadcastTextMessage(getGarbageText(true, false));
}

/**
 * 今日と明日のゴミの日テキストをフォロワー全員に送信
 */
function broadcastTodayTomorrowGarbageText() {
  broadcastTextMessage(getGarbageText(true, true));
}

/**
 * 今日のゴミの日テキストを返信
 */
function replyTodayGarbageText(reply_token) {
  replyTextMessage(reply_token, getGarbageText(true, false));
}

/**
 * 明日のゴミの日テキストを返信
 */
function replyTomorrowGarbageText(reply_token) {
  replyTextMessage(reply_token, getGarbageText(false, true));
}

/**
 * ゴミの日テキストを取得
 * showTodayGarbage: true 今日のゴミの日テキスト追加
 * showTomorrowGarbage: true 明日のゴミの日テキスト追加
 */
function getGarbageText(showTodayGarbage, showTomorrowGarbage) {
  // 日本時間の現在日時
  const todayDate = getTodayDate();
  
  var text = "";

  // 今日のゴミの日テキスト追加
  if (showTodayGarbage) {
    text += "今日 " + getTmpleteText(todayDate);
  }
  
  // 今日と明日どちらのテキストも表示する場合は,改行を含める
  if (showTodayGarbage && showTomorrowGarbage) {
    text += "\n\n";
  }

  // 明日のゴミの日テキスト追加
  if (showTomorrowGarbage) {
    const tomorrowDate = getTodayDate();
    tomorrowDate.setDate(todayDate.getDate() + 1);
    text += "明日 " + getTmpleteText(tomorrowDate);
  }

  return text;
}

function getTmpleteText(dateObj) {
  return (dateObj.getMonth() + 1) + "月" + dateObj.getDate() + "日(" + DAY_OF_THE_WEEKS[dateObj.getDay()] + ") は\n"
    + getWeekGarbageText(dateObj.getDay());
}

/**
 * 曜日毎のゴミの日メッセージを取得
 * weekDay: 日曜日(0)〜土曜日(6)
 */
function getWeekGarbageText(weekDay) {
  var text = "";
  if (DAY_OF_THE_WEEKS[weekDay] == "月") {
    text = "燃やすゴミ、ビン・缶・危険・有害ゴミの日です。"
  } else if (DAY_OF_THE_WEEKS[weekDay] == "火") {
    text = "プラスチックゴミの日です。"
  } else if (DAY_OF_THE_WEEKS[weekDay] == "水") {
    text = "古布・古紙ゴミの日です。"
  } else if (DAY_OF_THE_WEEKS[weekDay] == "木") {
    text = "燃やすゴミの日です。"
  } else if (DAY_OF_THE_WEEKS[weekDay] == "金") {
    text = "燃やさないゴミかペットボトルゴミの日です。"
  } else {
    text = "(基本的に)ゴミを出さない日です。"
  }
  return text;
}
