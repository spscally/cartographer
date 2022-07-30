import "./App.css";

import Books from "./Books.js";
import Reflections from "./Reflections.js";
import SideNav from "./SideNav.js";

import React from "react";

function App() {
  const [page, setPage] = React.useState("books");

  function onBooksClick() {
    console.log("clicked");
    setPage("books");
  }

  function onReflectionsClick() {
    setPage("reflections");
  }

  return (
    <>
      <SideNav
        navLabels={["Books", "Reflections"]}
        clickFunctions={[onBooksClick, onReflectionsClick]}
      />
      {page === "books" ? <Books /> : <Reflections />}
    </>
  );
}

export default App;
