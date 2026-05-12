module.exports.handler = async (event) => {
    if (event.httpMethod !== 'POST') return { statusCode: 405, body:
   'no' };                                                          
    try {
      const d = JSON.parse(event.body);                             
      const lines = ['\u59d3\u540d\uff1a' + d.name];
      if (d.title) lines.push('\u8077\u7a31\uff1a' + d.title);      
      if (d.myClass) lines.push('\u73ed\u7d1a\uff1a' + d.myClass);  
      const url = 'https://liff.line.me/2010068800-aFZP1shW';       
      const msg =                                                   
  '\u6709\u65b0\u7684\u6559\u5e2b\u6b0a\u9650\u7533\u8acb\n\n' +    
  lines.join('\n') + '\n\n' + url;                                  
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
