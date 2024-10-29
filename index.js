const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path')

http.createServer(function (req, res) {
    // if (req.url === '/') {
    //     fs.readFile(path.join(__dirname, 'public', 'index.html'), (err, content) => {
    //         if (err) throw err;
    //         res.writeHead(200, { 'Content-Type': 'text/HTML' })
    //         res.end(content)
    //     })
    // }
    // else if (req.url === '/about') {
    //     fs.readFile(path.join(__dirname, 'public', 'about.html'), (err, content) => {
    //         if (err) throw err;
    //         res.writeHead(200, { 'Content-Type': 'text/HTML' })
    //         res.end(content)
    //     })
    // }
    // else if (req.url === '/contact-me') {
    //     fs.readFile(path.join(__dirname, 'public', 'contact-me.html'), (err, content) => {
    //         if (err) throw err;
    //         res.writeHead(200, { 'Content-Type': 'text/HTML' })
    //         res.end(content)
    //     })
    // }
    // else {
    //     fs.readFile(path.join(__dirname, 'public', '404.html'), (err, content) => {
    //         if (err) throw err;
    //         res.writeHead(200, { 'Content-Type': 'text/HTML' })
    //         res.end(content)
    //     })
    // }

    let filePath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url +'.html')
    console.log(req.url)
    let extname = '.html';
    let contentType = 'text/html'

    fs.readFile(filePath, (err, content) => {
        if(err) {
        if(err.code == 'ENOENT') {
            fs.readFile(path.join(__dirname, 'public', '404.html'), (err, content) => {
                res.writeHead(200, { 'Content-Type': contentType })
                res.end(content, 'utf8')
            })
        }
        else {
            res.writeHead(500)
            res.end(`Server Error: ${err.code}`)
        }}
        else {
            res.writeHead(200)
            res.end(content, 'utf8')
        
    }
    })

}).listen(8080, () => console.log('server running'));