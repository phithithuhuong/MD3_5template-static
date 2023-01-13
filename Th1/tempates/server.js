const http = require('http');
const fs = require('fs');
http.createServer((req, res) => {
    fs.readFile('./index.html', 'utf8', (err, indexHtml) => {
        if (err) {
            res.writeHead(404, {'Content-Type': 'text/html'});
            return res.end('404 Not Found')

        }
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(indexHtml);
        return res.end()

    })

}).listen(9000, () => {
    console.log('http://localhost:9000')
})