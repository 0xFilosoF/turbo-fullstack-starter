import { json, urlencoded } from 'body-parser';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { prisma } from '@repo/database';
export var createServer = function () {
    console.log(prisma.user.fields);
    var app = express();
    app
        .disable('x-powered-by')
        .use(morgan('dev'))
        .use(urlencoded({ extended: true }))
        .use(json())
        .use(cors())
        .get('/message/:name', function (req, res) {
        return res.json({ message: "hello ".concat(req.params.name) });
    })
        .get('/status', function (_, res) {
        return res.json({ ok: true });
    });
    return app;
};
