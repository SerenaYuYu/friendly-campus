 Read 1 file (ctrl+o to expand)                                    
                                                    
⏺ exports.handler = async (event) => {                              
    if (event.httpMethod !== 'POST') return { statusCode: 405, body:
   'Method not allowed' };                                          
    try {                                                           
      const { name, title, myClass } = JSON.parse(event.body);      
      const parts = ['姓名：' + name];                              
      if (title) parts.push('職稱：' + title);
      if (myClass) parts.push('班級：' + myClass);                  
      const text = '📋 新的教師權限申請\n\n' + parts.join('\n') +
  '\n\n請開啟友善校園系統審核。';                                   
      await fetch('https://api.line.me/v2/bot/message/push', {
        method: 'POST',                                             
        headers: {
          'Content-Type': 'application/json',                       
          'Authorization': 'Bearer ' + process.env.LINE_ACCESS_TOKEN
        },
        body: JSON.stringify({
          to: process.env.ADMIN_LINE_ID,
          messages: [{ type: 'text', text }]                        
        })
      });                                                           
      return { statusCode: 200, body: 'OK' };
    } catch (e) {
      return { statusCode: 500, body: e.message };
    }                                                               
  };
