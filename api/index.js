import express from 'express'
const app = express()
const port = 3000

import {
    getBooksByDDC,
    getBooksByDate,
    putBook as _putBook
} from './book.js'

import {
    getReflectionsByDate,
    putReflection as _putReflection
} from './reflection.js'

// ================
// == MIDDLEWARE ==
// ================

app.listen(port, () => {
    console.log(`CARTOGRAPHER listening on port ${port}`)
})

app.use(express.json())

// ===========
// == BOOKS ==
// ===========

function getBooks(req, res, next) {
    if (req.query.from_ddc) {
        return Promise.resolve(getBooksByDDC(req.query.from_ddc, req.query.to_ddc))
            .then((result) => res.send(result))
            .catch((err) => next(err))
    } else if (req.query.from_date) {
        return Promise.resolve(getBooksByDate(req.query.from_date, req.query.to_date))
            .then((result) => res.send(result))
            .catch((err) => next(err))
    }
    res.sendStatus(400)
}

// TODO: jsonschema
function putBook(req, res, next) {
    const book = {
        "pk": "book",
        "sk": req.body.ddc.toString(),
        "date": req.body.date.toString(),
        "title": req.body.title.toString(),
        "author": req.body.author.toString()
    }
    return Promise.resolve(_putBook(book))
        .then((result) => res.send(result))
        .catch((err) => next(err))
}

app.route('/book')
    .get(getBooks)
    .put(putBook)

// =================
// == REFLECTIONS ==
// =================

function getReflections(req, res, next) {
    return Promise.resolve(getReflectionsByDate(req.params.category, req.query.from_date, req.query.to_date))
        .then((result) => res.send(result))
        .catch((err) => next(err))
}

function putReflection(req, res, next) {
    const reflection = {
        "pk": "reflection",
        "sk": req.params.category.toString(),
        "date": req.body.date.toString(),
        "title": req.body.title.toString(),
        "subtitle": req.body.subtitle.toString(),
        "body": req.body.body.toString()
    }
    return Promise.resolve(_putReflection(reflection))
        .then((result) => res.send(result))
        .catch((err) => next(err))
}

app.route('/reflection/:category')
    .get(getReflections)
    .put(putReflection)