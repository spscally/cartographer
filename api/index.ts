import express, { Request, Response, NextFunction } from 'express'
const app = express()
const port = 3000

import { putBook as _putBook } from './book.js'

// ===========
// == BOOKS ==
// ===========

function getBooks(req: Request, res: Response, next: NextFunction) {
    // TODO
}

function putBook(req: Request, res: Response, next: NextFunction) {
    // TODO
}

app.route('/book')
    .get(getBooks)
    .put(putBook)

// =================
// == REFLECTIONS ==
// =================

function getReflections(req: Request, res: Response, next: NextFunction) {
    // TODO
}

function putReflection(req: Request, res: Response, next: NextFunction) {
    // TODO
}

app.route('/reflection/:category')
    .get(getReflections)
    .put(putReflection)

// ================
// == MIDDLEWARE ==
// ================

app.listen(port, () => {
    console.log(`CARTOGRAPHER listening on port ${port}`)
})