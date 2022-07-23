import React from "react";

const SideNav = ({ onBooksClick, onReflectionsClick }) => {
  return (
    <div className="sidenav">
      <a className="sidenav-link" href="#books" onClick={() => onBooksClick()}>
        Books
      </a>
      <a
        className="sidenav-link"
        href="#reflections"
        onClick={() => onReflectionsClick()}
      >
        Reflections
      </a>
    </div>
  );
};

export default SideNav;
