require("dotenv").config();
const fs = require("fs");
const dayjs = require("dayjs");
const http = require("http");
const https = require("https");
const axios = require("axios");
//const csv = require("csvtojson");

// json-server
const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

// functions
//const fn = require("./lib/util");

const PORT = process.env.PORT || 3000;
const SSL = process.env.SSL || "OFF";
const SSL_PORT = process.env.SSL_PORT || 3443;

showEnv()
server.use(middlewares);
server.use(jsonServer.bodyParser);


http.createServer(server).listen(PORT, () => {
    console.log("JSON Server is runnning");
});

server.put('/api/:id',(req, res, next) => {
    console.log(req.body, req.params.id);
    next();
})

server.use(router);


if(SSL === "ON") {
    const options = {
        key: fs.readFileSync(process.env.SSL_KEY),
        cert: fs.readFileSync(process.env.SSL_CERT),
        ca: fs.readFileSync(process.env.SSL_CA),
        passphrase: process.env.SSL_PASS,
    };
    https.createServer(options, server).listen(SSL_PORT, () => {
        console.log("SSL JSON Server is running");
    });
}

function showEnv() {
    console.info(`SSL: ${SSL}`);
    if(SSL === "ON"){
        console.info(`PORT: ${SSL_PORT}`);
    } else {
        console.info(`PORT: ${PORT}`);
    }
}