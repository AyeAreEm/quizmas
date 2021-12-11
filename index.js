const express = require('express');
const qnas = require('./qnas');

const app = express();

app.set('views', './views');
app.set('view engine', 'ejs');
app.use(express.static('views'));
app.use(express.json({ limit: '10Mb'}))

let points = 0;

app.get('/', (req, res) => {
    // when user joins, reset all points
    res.render('index');
});

app.get('/results', (req, res) => {
    res.render('results', {
        points
    })
});

// xmas stuff
app.get('/christmas/:id', (req, res) => {
    res.render('temp', {
        q: qnas.xmas[req.params.id].q,
        op1: qnas.xmas[req.params.id].op1,
        op2: qnas.xmas[req.params.id].op2,
        op3: qnas.xmas[req.params.id].op3,
        op4: qnas.xmas[req.params.id].op4,
        qNum: parseInt(req.params.id)
    });
});

app.post('/christmas', (req, res) => {
    try {
        if (qnas.xmas[req.body.qNum].a == req.body.answer) {
            points += 1;
            console.log(points)
        }
    } catch {
        res.sendStatus(500);
    }
});

// general stuff
app.get('/general/:id', (req, res) => {
    res.render('temp', {
        q: qnas.general[req.params.id].q,
        op1: qnas.general[req.params.id].op1,
        op2: qnas.general[req.params.id].op2,
        op3: qnas.general[req.params.id].op3,
        op4: qnas.general[req.params.id].op4,
        qNum: parseInt(req.params.id)
    });
});

app.post('/general', (req, res) => {
    try {
        if (qnas.general[req.body.qNum].a == req.body.answer) {
            points += 1;
            console.log(points)
        }
    } catch {
        res.sendStatus(500);
    }
});

// me stuff
app.get('/adrian/:id', (req, res) => {
    res.render('temp', {
        q: qnas.adrian[req.params.id].q,
        op1: qnas.adrian[req.params.id].op1,
        op2: qnas.adrian[req.params.id].op2,
        op3: qnas.adrian[req.params.id].op3,
        op4: qnas.adrian[req.params.id].op4,
        qNum: parseInt(req.params.id)
    });
});

app.post('/adrian', (req, res) => {
    try {
        if (qnas.adrian[req.body.qNum].a == req.body.answer) {
            points += 1;
            console.log(points)
        }
    } catch {
        res.sendStatus(500);
    }
});

const port = process.env.PORT || 4000;
app.listen(port);