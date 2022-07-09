const express = require('express');
const cookieParser = require('cookie-parser')();
const bodyParser = require('body-parser')
const uuid = require('uuid');
const app = express();
const pkg = require("@prisma/client");
const { PrismaClient } = pkg;
const prisma = new PrismaClient();

const port = 3000;
let users = {
}

var restoreOrCreateUser = function(req, res, next) {
    if (!('userUUID' in req.cookies)) {
        res.cookie('userUUID', uuid.v4());
    }
    req.userUUID = req.cookies.userUUID;
    if (!(req.userUUID in users)) {
        users[req.userUUID] = {
        }
    }
    next();
}

app.use([cookieParser, restoreOrCreateUser]);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/inbox', async (req, res) => {
    const skip = (typeof req.query.skip === "string") ? Number(req.query.skip) : undefined;
    const take = (typeof req.query.take === "string") ? Number(req.query.take) : undefined;
    let result = await prisma.message.findMany({
        skip: skip,
        take: take,
        include: { author: true, file: true },
    });
    result.forEach((item) => {
        if (item.id in users[req.userUUID]) {
            item.readed = users[req.userUUID][item.id]
        } else {
            item.readed = false;
        }
    });
    res.send(result);
});

app.post('/mark-readed', (req, res) => {
    req.body.ids.forEach(value => {
        users[req.userUUID][value] = true
    })
    res.send({
        "detail": "OK"
    });
});

app.post('/mark-unreaded', (req, res) => {
    req.body.ids.forEach(value => {
        users[req.userUUID][value] = false
    })
    res.send({
        "detail": "OK"
    });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
