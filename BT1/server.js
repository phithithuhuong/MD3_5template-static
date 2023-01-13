
const http = require('http');
const fs = require('fs');
const qs = require('qs');
let user =[]
 let server = http.createServer((req, res) => {
     if (req.method==='GET'){
         fs.readFile('./views/info.html', 'utf8', (err, infoHtml)=>{
             if (err){
                 console.log(err)
             }
             res.writeHead(200,{'Content-Type':'text/html'});
             res.write(infoHtml);
             res.end();

         })
     }else {
         let  data ='';
         req.on('data',chunk => {
             data+=chunk
             })

         req.on('end',()=>{
             user.push(qs.parse(data))
             console.log(user)

             return res.end('Register success !')
         })
         req.on('error',()=>{
             throw Error('Error')
         })



     }
 })

server.listen(2000,()=>{
    console.log('http://localhost:2000');
 })