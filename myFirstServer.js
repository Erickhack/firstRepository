
'use strict';

const http = require('http');

const port = 9999;
const statusBadReq = 400;
const statusNotFaund = 404;
const statusOk = 200;

let nextId = 1;
const posts = [];

const methods = new Map();
methods.set('/posts.get', (req, res) => {
    res.writeHead(statusOk, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(posts));
});
methods.set('/posts.getById', (req, res) => {
    
});
methods.set('/posts.post', (req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const searchParams = url.searchParams;

    if (!searchParams.has('content')) {
        res.writeHead(statusBadReq);
        res.end()
        return;
    }

    const content = searchParams.get('content');
    console.log(content);

    const post = {
        if: nextId++,
        content: content,
        created: Date.now(),
    }

    posts.unshift(post);
    res.writeHead(statusOk, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(post));
});
methods.set('/posts.edit', (req, res) => {});
methods.set('/posts.delete', (req, res) => {});

http.createServer((req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`); // Need will learn
    const pathname = url.pathname;

    const method = methods.get(pathname);
    if (method === undefined) {
        res.writeHead(statusNotFaund);
        res.end()
        return;
    }

    method(req, res);
}).listen(port);