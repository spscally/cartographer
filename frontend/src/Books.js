import React from "react";

import { API } from "./api";
import axios from "axios";
import { SimpleInput } from "./input";
import { dateSort, ddcSort } from "./sort";

const modes = ["add", "view"];

const AddBook = () => {
  const [isbn, setIsbn] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [author, setAuthor] = React.useState("");
  const [ddc, setDdc] = React.useState("");

  function handleSubmitBook(event) {
    event.preventDefault();
    axios
      .put(`${API}/book`, {
        title,
        author,
        ddc,
      })
      .then(
        (res) => {
          alert("Success!");
          setTitle("");
          setAuthor("");
          setDdc("");
          setIsbn("");
        },
        (error) => alert(error)
      );
  }

  function handleSubmitIsbn(event) {
    event.preventDefault();
    axios(`${API}/ddc?isbn=${isbn}`).then(
      (res) => {
        if (!res.data.ddc) alert("Book not found!");
        setTitle(res.data.title ?? "");
        setAuthor(res.data.author ?? "");
        setDdc(res.data.ddc ?? "");
      },
      (error) => alert(error)
    );
  }

  return (
    <>
      <form onSubmit={handleSubmitIsbn}>
        <SimpleInput
          name="ISBN"
          value={isbn}
          onChange={(event) => setIsbn(event.target.value)}
        />
        <input type="submit" value="Get DDC" disabled={!isbn} />
      </form>
      <hr />
      {ddc ?? (
        <form onSubmit={handleSubmitBook}>
          <SimpleInput
            name="Title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
          <SimpleInput
            name="Author"
            value={author}
            onChange={(event) => setAuthor(event.target.value)}
          />
          <SimpleInput
            name="DDC"
            value={ddc}
            onChange={(event) => setDdc(event.target.value)}
          />
          <input
            type="submit"
            value="Add"
            disabled={!title || !author || !ddc}
          />
        </form>
      )}
    </>
  );
};

const ViewBooks = () => {
  const [mode, setMode] = React.useState();

  return (
    <>
      <button
        type="button"
        className={
          mode === "by_date"
            ? "cartographerButton cartographerButton-selected"
            : "cartographerButton"
        }
        onClick={() => setMode("by_date")}
      >
        By Date
      </button>
      <button
        type="button"
        className={
          mode === "by_ddc"
            ? "cartographerButton cartographerButton-selected"
            : "cartographerButton"
        }
        onClick={() => setMode("by_ddc")}
      >
        By DDC
      </button>
      <hr />
      {mode === "by_date" ? <ViewBooksByDate /> : null}
      {mode === "by_ddc" ? <ViewBooksByDDC /> : null}
    </>
  );
};

const ViewBooksByDate = () => {
  const [fromDate, setFromDate] = React.useState("");
  const [toDate, setToDate] = React.useState("");
  const [books, setBooks] = React.useState([]);

  function handleSubmit(event) {
    event.preventDefault();
    axios(`${API}/book?from_date=${fromDate}&to_date=${toDate}`).then(
      (res) => {
        dateSort(res.data);
        setBooks(res.data);
      },
      (error) => console.error(error)
    );
  }

  return (
    <>
      {" "}
      <form onSubmit={handleSubmit}>
        <SimpleInput
          name="From Date"
          value={fromDate}
          onChange={(event) => setFromDate(event.target.value)}
        />
        <SimpleInput
          name="To Date"
          value={toDate}
          onChange={(event) => setToDate(event.target.value)}
        />
        <input type="submit" value="Search" />
      </form>
      <hr />
      {books.length > 0 ? (
        <>
          Results: {books.length}
          <hr />
        </>
      ) : null}
      {books.map((book, index) => (
        <Book key={index} book={book} mode="by_date" />
      ))}
    </>
  );
};

const ViewBooksByDDC = () => {
  const [fromDDC, setFromDDC] = React.useState("");
  const [toDDC, setToDDC] = React.useState("");
  const [books, setBooks] = React.useState([]);

  function handleSubmit(event) {
    event.preventDefault();
    axios(`${API}/book?from_ddc=${fromDDC}&to_ddc=${toDDC}`).then(
      (res) => {
        ddcSort(res.data);
        setBooks(res.data);
      },
      (error) => console.error(error)
    );
  }

  return (
    <>
      {" "}
      <form onSubmit={handleSubmit}>
        <SimpleInput
          name="From DDC"
          value={fromDDC}
          onChange={(event) => setFromDDC(event.target.value)}
        />
        <SimpleInput
          name="To DDC"
          value={toDDC}
          onChange={(event) => setToDDC(event.target.value)}
        />
        <input type="submit" value="Search" />
      </form>
      <hr />
      {books.length > 0 ? (
        <>
          Results: {books.length}
          <hr />
        </>
      ) : null}
      {books.map((book, index) => (
        <Book key={index} book={book} mode="by_ddc" />
      ))}
    </>
  );
};

const Book = ({ book, mode }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <div onClick={() => setOpen(!open)} className="dataRow">
      <div className="dataRow-closedText">
        {mode === "by_date"
          ? `${book.date.substring(0, 10)}: ${book.title}`
          : null}
        {mode === "by_ddc" ? `${book.sk.split("_")[0]}: ${book.title}` : null}
      </div>
      <div className="dataRow-dropdownButton">{open ? "-" : "+"}</div>
      {open ? (
        <div className="dataRow-expanded">
          <ul>
            <li>Title: {book.title}</li>
            <li>Author: {book.author}</li>
            {!book.date.startsWith("0001-01-01") ? (
              <li>Date: {book.date.substring(0, 10)}</li>
            ) : null}
            <li>DDC: {book.sk.split("_")[0]}</li>
          </ul>
        </div>
      ) : null}
    </div>
  );
};

const Books = () => {
  const [mode, setMode] = React.useState(modes[0]);

  return (
    <div className="page">
      <h1>BOOKS</h1>
      <hr />
      {modes.map((m, index) => (
        <button
          key={index}
          className={
            m === mode
              ? "cartographerButton cartographerButton-selected"
              : "cartographerButton"
          }
          onClick={() => setMode(m)}
        >
          {m}
        </button>
      ))}
      <hr />
      {mode === "add" ? <AddBook /> : null}
      {mode === "view" ? <ViewBooks /> : null}
    </div>
  );
};

export default Books;
