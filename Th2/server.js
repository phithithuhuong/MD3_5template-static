const http = require('http');
const fs = require('fs');
let server= http.createServer((req, res) => {
    fs.readFile('./template/index.html','utf8',(err, data) => {
        if (err){
            console.log(err.message)
        }
        let you = 'Honey';
        data= data.replace('{you}',you)
        res.writeHead(200,{'Content-Type':'text/html'});
        res.write(data);
        return res.end();
    })

})
server.listen(3000,()=>{
    console.log('http://localhost:3000')
})