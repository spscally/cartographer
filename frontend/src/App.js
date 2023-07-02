import "./App.css";

import Books from "./Books.js";
import SideNav from "./SideNav.js";

import React from "react";

function App() {
  const [page, setPage] = React.useState("books");

  function onBooksClick() {
    setPage("books");
  }

  return (
    <>
      <SideNav navLabels={["Books"]} clickFunctions={[onBooksClick]} />
      {page === "books" ? <Books /> : undefined}
    </>
  );
}

export default App;
