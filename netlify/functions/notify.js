exports.handler = async (event) => {                          
   2 -  if (event.httpMethod !== 'POST') return { statusCode: 405, 
     -body: 'Method not allowed' }; 
   1 +exports.handler = async function(event) {
   2 +  if (event.httpMethod !== 'POST') {
   3 +    return { statusCode: 405, body: 'Method not allowed' };
   4 +  }
   5    try {
   4 -    const { name, title, myClass } = JSON.parse(event.body);
   5 -    const parts = ['姓名：' + name];
   6 -    if (title) parts.push('職稱：' + title); 
   7 -    if (myClass) parts.push('班級：' + myClass); 
   8 -    const text = '📋 新的教師權限申請\n\n' + parts.join('\n')
     - + '\n\n請開啟友善校園系統審核。'; 
   9 -    await fetch('https://api.line.me/v2/bot/message/push', { 
   6 +    var data = JSON.parse(event.body);
   7 +    var parts = ['姓名：' + data.name];
   8 +    if (data.title) parts.push('職稱：' + data.title);
   9 +    if (data.myClass) parts.push('班級：' + data.myClass);
         +Class);                                                  
      10 +    var text = '有新的教師權限申請\n\n' + parts.joi      
         +n('\n') + '\n\n請開啟友善校園系統審核。';                
      11 +    var res = await fetch('https://api.line.me/v2/b      
         +ot/message/push', {                                
      12        method: 'POST',
      13        headers: {                       
      14          'Content-Type': 'application/json',
     ...      
      16        },                
      17        body: JSON.stringify({      
      18          to: process.env.ADMIN_LINE_ID,                   
      17 -        messages: [{ type: 'text', text }]               
      19 +        messages: [{ type: 'text', text: text }]   
      20        })
      21      });                                
      22      return { statusCode: 200, body: 'OK' };               
                                    
⏺ exports.handler = async function(event) {
    if (event.httpMethod !== 'POST') {                              
      return { statusCode: 405, body: 'Method not allowed' };
    }
    try {                                                           
      var data = JSON.parse(event.body);
      var parts = ['姓名：' + data.name];                           
      if (data.title) parts.push('職稱：' + data.title);          
      if (data.myClass) parts.push('班級：' + data.myClass);        
      var text = '有新的教師權限申請\n\n' + parts.join('\n') +    
  '\n\n請開啟友善校園系統審核。';                                   
      var res = await
  fetch('https://api.line.me/v2/bot/message/push', {                
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
