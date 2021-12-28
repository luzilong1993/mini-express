// const express = require('express');
const express = require('./express');

const app = new express();

app.get('/test', (req, res, next) => {
    console.log('test1');
    next()
});

app.get('/test', (req, res, next) => {
    console.log('test2');
    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
    res.end('我是test页面');
})


app.listen(8888, () => {
    console.log('服务启动');
})