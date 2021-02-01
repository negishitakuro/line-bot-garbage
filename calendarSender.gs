/* 定期処理：
 * 毎月1日00:00→今月のゴミの日カレンダー
 */

/**
 * 今月のカレンダー画像をフォロワー全員に送信
 */
function broadcastThisMonthCalendar() {
  var messages = getMonthCalendarMessages(Number(getTodayDate().getMonth()) + 1);
  if (messages != null) {
    // 毎月の定期的なメッセージである旨のテキストを追加
    messages.unshift(
      {
        "type":"text",
        "text":"毎月1日の定期的なメッセージをお送りします。"
      }
    );
    broadcastMessage(messages);
  }
}

/**
 * 今月のカレンダー画像を返信
 */
function replyThisMonthCalendar(reply_token) {
  replyMessages(reply_token, getMonthCalendarMessages(Number(getTodayDate().getMonth()) + 1));
}

/**
 * 指定月のカレンダー画像とTextメッセージを取得
 * month: 1〜12月
 */
function getMonthCalendarMessages(month) {
  // 月の範囲外の場合は処理スキップ
  if (month < 1 || 12 < month) {
    Logger.log('month is out of range: [' + month + ']');
    return null;
  }

  const monthImageID = getMonthImageID(month);

  // nullチェック
  if (monthImageID == null) {
    Logger.log('monthImageID is null');
    return null;
  }

  // カレンダー画像を送信
  const imageRequestURL = "https://drive.google.com/uc?id=" + monthImageID;
  var messages = [
      {
        "type":"image",
        "originalContentUrl":imageRequestURL,
        "previewImageUrl":imageRequestURL
      },
      {
        "type":"text",
        "text":month + "月のゴミの日カレンダーです。"
      },
    ];
  return messages;
}

/**
 * 指定した月のゴミの日カレンダー画像IDを取得する
 * month: 1〜12月
 */ 
function getMonthImageID(month) {
  var query = '"' + CALENDAR_IMAGES_DIRECTORY_ID + '" in parents and trashed = false and ' +
      'mimeType != "application/vnd.google-apps.folder" and title = "' + month + '.jpg"';

  var folders = Drive.Files.list({
    q: query,
    maxResults: 1
  });
  
  if (folders.items && folders.items.length > 0) {
    // Logger.log('%s (ID: %s)', folders.items[0].title, folders.items[0].id);
    return folders.items[0].id;
  } else {
    // Logger.log('No folders found.');
    return null;
  }
}

