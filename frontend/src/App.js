import "./App.css";

import Books from "./Books.js";
import Reflections from "./Reflections.js";
import SideNav from "./SideNav.js";

import React from "react";

const API = "http://localhost:5000";

function App() {
  const [page, setPage] = React.useState("books");

  function onBooksClick() {
    setPage("books");
  }

  function onReflectionsClick() {
    setPage("reflections");
  }

  function showPage() {
    switch (page) {
      case "books":
        return <Books api={API} />;
      default:
        return <Reflections api={API} />;
    }
  }

  return (
    <>
      <SideNav
        onBooksClick={onBooksClick}
        onReflectionsClick={onReflectionsClick}
      />
      {showPage()}
    </>
  );
}

export default App;
