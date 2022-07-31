import React from "react";

import { API } from "./api";
import axios from "axios";
import { SimpleInput } from "./input";

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
      {ddc ? (
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
      ) : null}
    </>
  );
};

const ViewBooks = () => {
  return <div> view books</div>;
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
