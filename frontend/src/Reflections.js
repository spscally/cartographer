import React from "react";
import axios from "axios";
import SideNav from "./SideNav";

const Books = ({ api }) => {
  const [categories, setCategories] = React.useState([]);
  const [reflections, setReflections] = React.useState([]);

  const fetchCategories = async () => {
    const result = await axios(`${api}/category/reflection`);
    console.log(result);
    setCategories(result.data);
  };

  React.useEffect(() => {
    fetchCategories();
  });

  return (
    <div className="page">
      {/* TODO: not sure why this isn't displaying */}
      <SideNav navLabels={categories} clickFunctions={[undefined, undefined]} />
      <ul>
        {categories.map((category, index) => (
          <li key="index">{category}</li>
        ))}
      </ul>
    </div>
  );

  // TODO: I think I'll need an endpoint for getting all categories
};

export default Books;
