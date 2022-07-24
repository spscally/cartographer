import express from "express";
import cors from "cors";

const app = express();
const port = 5000;

import { getBooksByDDC, getBooksByDate, putBook as _putBook } from "./book.js";

import {
  getReflectionsByDate,
  putReflection as _putReflection,
  getReflectionCategories as _getReflectionCategories,
  getAllReflectionsByDate,
} from "./reflection.js";

// ================
// == MIDDLEWARE ==
// ================

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.listen(port, () => {
  console.log(`CARTOGRAPHER listening on port ${port}`);
});

app.use(express.json());

// ===========
// == BOOKS ==
// ===========

function getBooks(req, res, next) {
  if (req.query.from_ddc) {
    return Promise.resolve(getBooksByDDC(req.query.from_ddc, req.query.to_ddc))
      .then((result) => res.send(result))
      .catch((err) => next(err));
  } else if (req.query.from_date) {
    return Promise.resolve(
      getBooksByDate(req.query.from_date, req.query.to_date)
    )
      .then((result) => res.send(result))
      .catch((err) => next(err));
  }
  res.sendStatus(400);
}

// TODO: jsonschema
function putBook(req, res, next) {
  const date = req.body.date ?? new Date().toISOString();
  const book = {
    pk: "book",
    sk: req.body.ddc.toString(),
    date: date,
    title: req.body.title.toString(),
    author: req.body.author.toString(),
  };
  return Promise.resolve(_putBook(book))
    .then((result) => res.send(result))
    .catch((err) => next(err));
}

app.route("/book").get(getBooks).put(putBook);

// =================
// == REFLECTIONS ==
// =================

function getReflections(req, res, next) {
  return Promise.resolve(
    req.params.category
      ? getReflectionsByDate(
          req.params.category,
          req.query.from_date,
          req.query.to_date
        )
      : getAllReflectionsByDate(req.query.from_date, req.query.to_date)
  )
    .then((result) => res.send(result))
    .catch((err) => next(err));
}

function putReflection(req, res, next) {
  const date = req.body.date ?? new Date().toISOString();
  const reflection = {
    pk: "reflection",
    sk: `${req.params.category.toString()}_${date}`,
    date: date,
    title: req.body.title.toString(),
    subtitle: req.body.subtitle.toString(),
    body: req.body.body.toString(),
  };
  return Promise.resolve(_putReflection(reflection))
    .then((result) => res.send(result))
    .catch((err) => next(err));
}

app.route("/reflection").get(getReflections);
app.route("/reflection/:category").get(getReflections).put(putReflection);

// ================
// == CATEGORIES ==
// ================

function getReflectionCategories(req, res, next) {
  return Promise.resolve(_getReflectionCategories())
    .then((result) => res.send(result))
    .catch((err) => next(err));
}

app.route("/category/reflection").get(getReflectionCategories);
