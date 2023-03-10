// const http = require('http');
// const fs = require('fs');
// const formidable = require('formidable');
// let  users= []
// http.createServer((req, res) => {
//     if (req.method === 'GET') {
//         fs.readFile('./views/register.html', 'utf8', (err, registerHtml) => {
//             if (err) {
//                 console.log(err)
//             }
//             res.writeHead(200, {'Content-Type': 'text/html'});
//             res.write(registerHtml);
//             return res.end();
//
//         });
//     }else {
//         let from = new formidable.IncomingForm();
//         from.uploadDir='upload/';
//         form.parse(req,(err,fields,files)=>{
//             let userInfo ={
//                 name: fields.name,
//                 email:fields.email,
//                 password:fields.password
//             };
//             if (err){
//                 console.log(err)
//             }
//             let tmpPath= files.avatar.filepath;
//             let newPath= form.uploadDir+files.avatar.originalFilename;
//             userInfo.avatar= newPath
//             fs.rename(tmpPath,newPath,(err)=>{
//                 if(err)throw err;
//                 let fileType =files.avatar.mimeType
//                 let mimeType= ["image/jpeg", "image/jpg", "image/png"]
//                 if (mimeType.indexOf(fileType) === -1) {
//                     res.writeHead(200, {"Content-Type": "text/html"});
//                     return res.end('The file is not in the correct format: png, jpeg, jpg');
//                 }
//             });
//             users.push(userInfo);
//             console.log(users)
//             return res.end('Register success!')
//
//         })
//     }
// }) .listen(3000,()=>{
//     console.log('http://localhost:3000')
// })
let http = require('http');
let fs = require('fs');
let formidable = require('formidable');

let users = [];

let server = http.createServer(function (req, res) {
    if (req.method === 'GET') {
        fs.readFile('./views/register.html', function (err, data) {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            return res.end();
        });
    } else {
        // Kh???i t???o bi???n form b???ng IncomingForm ????? ph??n t??ch m???t t???p tin t???i l??n
        let form = new formidable.IncomingForm();
        // C???u h??nh th?? m???c s??? ch???a file tr??n server v???i h??m .uploadDir
        form.uploadDir = "upload/"
        // X??? l?? upload file v???i h??m .parse
        form.parse(req, function (err, fields, files) {
            // T???o ?????i t?????ng user
            let userInfo = {
                name: fields.name,
                email: fields.email,
                password: fields.password,
            };

            if (err) {
                // Ki???m tra n???u c?? l???i
                console.error(err.message);
                return res.end(err.message);
            }
            // L???y ra ???????ng d???n t???m c???a t???p tin tr??n server
            let tmpPath = files.avatar.filepath;
            console.log(tmpPath)
            // Kh???i t???o ???????ng d???n m???i, m???c ????ch ????? l??u file v??o th?? m???c uploads c???a ch??ng ta
            let newPath = form.uploadDir + files.avatar.originalFilename;
            // T???o thu???c t??nh avatar v?? g??n gi?? tr??? cho n??
            userInfo.avatar = newPath;
            // ?????i t??n c???a file t???m th??nh t??n m???i v?? l??u l???i
            fs.rename(tmpPath, newPath, (err) => {
                if (err) throw err;
                let fileType = files.avatar.mimeType;
                let mimeTypes = ["image/jpeg", "image/jpg", "image/png"];
                if (mimeTypes.indexOf(fileType) === -1) {
                    res.writeHead(200, {"Content-Type": "text/html"});
                    return res.end('The file is not in the correct format: png, jpeg, jpg');
                }
            });
            users.push(userInfo);
            console.log(users)
            return res.end('Register success!');
        });
    }
});

server.listen(8080, function () {
    console.log('server running at localhost:8080 ')
});
