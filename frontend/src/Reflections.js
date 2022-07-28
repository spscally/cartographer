import React from "react";
import axios from "axios";

const Reflections = ({ api }) => {
  const [category, setCategory] = React.useState(null);
  const [categories, setCategories] = React.useState([]);
  const [reflections, setReflections] = React.useState([]);

  console.log("render reflections");

  React.useEffect(() => {
    axios(`${api}/category/reflection`).then(
      (res) => setCategories(res.data),
      (error) => console.error(error)
    );
  }, [api]);

  React.useEffect(() => {
    if (!category) return;
    axios(
      `${api}/reflection/${category.toLowerCase()}?start_date=2022-01-01&end_date=2023-01-01`
    ).then(
      (res) => setReflections(res.data),
      (error) => console.error(error)
    );
  }, [api, category]);

  return (
    <div className="page">
      REFLECTIONS
      {categories.map((category, index) => (
        <button onClick={() => setCategory(category)}>{category}</button>
      ))}
      <hr />
      <ul>
        {reflections.map((reflection, index) => (
          <ul key="index">{reflection.title}</ul>
        ))}
      </ul>
    </div>
  );
};

export default Reflections;
