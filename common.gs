// LINEチャンネルのトークン
const CHANNEL_TOKEN = '';

// LINE Messaging APIによりフォローしている全ユーザー宛に送信する際のURL
const BROADCAST_URL = 'https://api.line.me/v2/bot/message/broadcast';

// LINE Messaging APIによりメッセージを送ったユーザー宛にリプライする際のURL
const REPLY_URL = 'https://api.line.me/v2/bot/message/reply';

// 曜日配列
const DAY_OF_THE_WEEKS = ["日","月","火","水","木","金","土"];

// Google Driveの「ゴミ出しカレンダー」フォルダのID
const CALENDAR_IMAGES_DIRECTORY_ID = "";

/**
 * 今日の日付のDateオブジェクトを取得
 */
function getTodayDate() {
  return new Date(Date.now() + ((new Date().getTimezoneOffset() + (9 * 60)) * 60 * 1000))
}

/**
 * テキストMessageを返信
 */
function replyTextMessage(reply_token, text) {
  var messages = [
    {
      'type': 'text',
      'text': text,
    }
  ];
  replyMessages(reply_token, messages)
}

/**
 * Messageを返信
 */
function replyMessages(reply_token, messages) {
  UrlFetchApp.fetch(REPLY_URL, {
    'headers': {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': 'Bearer ' + CHANNEL_TOKEN,
    },
    'method': 'post',
    'payload': JSON.stringify({
      'replyToken': reply_token,
      'messages': messages,
    }),
  });
}

/**
 * フォロワー全員にテキストMessageを送信
 */
function broadcastTextMessage(text) {
  var messages = [
    {
      "type":"text",
      "text":text
    },
  ];
  broadcastMessage(messages);
}

/**
 * フォロワー全員にMessageを送信
 */
function broadcastMessage(messages) { 
  var options = {
    'headers': {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': 'Bearer ' + CHANNEL_TOKEN,
    },
    'method': 'post',
    'payload': JSON.stringify({'messages': messages}),
  };
  UrlFetchApp.fetch(BROADCAST_URL, options);
}

function debug(text) {
  var aa = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("gomi");
  aa.getRange("A1").setValue(text);
}

function debugAt(range, text) {
  var aa = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("gomi");
  aa.getRange(range).setValue(text);
}