module.exports.handler = async (event) => {
    if (event.httpMethod !== 'POST') return { statusCode: 405, body:
   'no' };                                                          
    try {
      const d = JSON.parse(event.body);
      const lines = ['姓名：' + d.name];                            
      if (d.title) lines.push('職稱：' + d.title);
      if (d.myClass) lines.push('班級：' + d.myClass);              
      const msg = '有新的教師權限申請\n\n' + lines.join('\n') + '\n\n請 
  點以下連結審核：\nhttps://liff.line.me/2010068800-aFZP1shW';                                  
      await fetch('https://api.line.me/v2/bot/message/push', {
        method: 'POST',                                             
        headers: {
          'Content-Type': 'application/json',                       
          'Authorization': 'Bearer ' + process.env.LINE_ACCESS_TOKEN
        },
        body: JSON.stringify({
          to: process.env.ADMIN_LINE_ID,                            
          messages: [{ type: 'text', text: msg }]
        })                                                          
      });         
      return { statusCode: 200, body: 'ok' };
    } catch (e) {
      return { statusCode: 500, body: e.message };                  
    }
  };                                
