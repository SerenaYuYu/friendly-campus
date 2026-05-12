exports.handler = async function(event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method not allowed' };
  }
  try {
    var data = JSON.parse(event.body);
    var parts = ['姓名：' + data.name];
    if (data.title) parts.push('職稱：' + data.title);
    if (data.myClass) parts.push('班級：' + data.myClass);
    var text = '有新的教師權限申請\n\n' + parts.join('\n') + '\n\n請開啟友善校園系統審核。';
    var res = await fetch('https://api.line.me/v2/bot/message/push', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + process.env.LINE_ACCESS_TOKEN
      },
      body: JSON.stringify({
        to: process.env.ADMIN_LINE_ID,
        messages: [{ type: 'text', text: text }]
      })
    });
    return { statusCode: 200, body: 'OK' };
  } catch (e) {
    return { statusCode: 500, body: e.message };
  }
};
