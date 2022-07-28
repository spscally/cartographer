import React from "react";

const SideNav = ({ navLabels, clickFunctions }) => {
  return (
    <div className="sidenav">
      {navLabels.map((label, index) => (
        <a
          key={label}
          className="sidenav-link"
          href={`#${label.toLowerCase()}`}
          onClick={clickFunctions[index]}
        >
          {label}
        </a>
      ))}
    </div>
  );
};

export default SideNav;
