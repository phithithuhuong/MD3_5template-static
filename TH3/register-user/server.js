const http = require('http');
const fs = require('fs');
const qs = require('qs')
http.createServer((req, res) => {
        if (req.method === 'GET') {
            fs.readFile('./views/register.html', 'utf8', (err, registerHtml) => {
                if (err) {
                    console.log(err)
                }
                res.writeHead(200,{'Content-Type': 'text/html'});
                res.write(registerHtml);
                return res.end();

            })
        } else {
            let data = '';
            req.on('data', chunk => {
                data += chunk

            })
            req.on('end', () => {
                console.log(qs.parse(data))
                return res.end('Register not fail')
            })
            req.on('error', () => {
                throw Error('Error')
            })

        }
    }
).listen(2000,()=>{
    console.log('http://localhost:2000')
})