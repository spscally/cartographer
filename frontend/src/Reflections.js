import React from "react";
import axios from "axios";

import { API } from "./api.js";
import { SimpleInput } from "./input.js";
import { dateSort } from "./sort.js";

const modes = ["add", "view"];

const AddReflection = () => {
  const [title, setTitle] = React.useState("");
  const [subtitle, setSubtitle] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [body, setBody] = React.useState("");

  function handleSubmit(event) {
    event.preventDefault();
    const payload = {
      title,
      subtitle,
      body,
    };
    axios.put(`${API}/reflection/${category}`, payload).then(
      (res) => {
        alert("Success!");
        setTitle("");
        setSubtitle("");
        setCategory("");
        setBody("");
      },
      (error) => alert(error)
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <SimpleInput
        name={"Title"}
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />
      <SimpleInput
        name={"Subtitle"}
        value={subtitle}
        onChange={(event) => setSubtitle(event.target.value)}
      />
      <SimpleInput
        name={"Category"}
        value={category}
        onChange={(event) => setCategory(event.target.value)}
      />
      <SimpleInput
        name={"Body"}
        value={body}
        onChange={(event) => setBody(event.target.value)}
        type="textarea"
      />
      <input type="submit" value="Add" />
    </form>
  );
};

const ViewReflections = () => {
  const [categories, setCategories] = React.useState([]);

  const [category, setCategory] = React.useState();
  const [fromDate, setFromDate] = React.useState("");
  const [toDate, setToDate] = React.useState("");

  const [reflections, setReflections] = React.useState([]);

  React.useEffect(() => {
    axios(`${API}/category/reflection`).then(
      (res) => setCategories(res.data),
      (error) => console.error(error)
    );
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    axios(
      `${API}/reflection/${category}?from_date=${fromDate}&to_date=${toDate}`
    ).then(
      (res) => {
        dateSort(res.data);
        setReflections(res.data);
      },
      (error) => console.error(error)
    );
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        {categories.map((c, index) => (
          <button
            key={index}
            className={
              c === category
                ? "cartographerButton cartographerButton-selected"
                : "cartographerButton"
            }
            onClick={() => setCategory(c)}
          >
            {c}
          </button>
        ))}
        <hr />
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
        <input type="submit" value="Search" disabled={!category} />
      </form>
      <hr />
      <ul>
        {reflections.map((reflection, index) => (
          <ul key={index}>
            {reflection.date.substring(0, 10)}: {reflection.title}
          </ul>
        ))}
      </ul>
    </>
  );
};

const Reflections = () => {
  const [mode, setMode] = React.useState("add");

  function renderReflectionModePage() {
    if (mode === "add") return <AddReflection />;
    else if (mode === "view") return <ViewReflections />;
  }

  return (
    <div className="page">
      <h1>REFLECTIONS</h1>
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
      {renderReflectionModePage()}
    </div>
  );
};

export default Reflections;
