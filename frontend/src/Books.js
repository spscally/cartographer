import React from "react";

const Books = ({ api }) => {
  const [books, setBooks] = React.useState([]);

  // TODO: need to figure out why the request keeps getting made

  React.useEffect(() => {
    fetch(`${api}/book?from_date=2022-01-01`)
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          setBooks(result);
        },
        (error) => console.error(error)
      );
  }, [books]);

  return (
    <div className="page">
      <ul>
        {books.map((book) => (
          <li key={book.sk}>
            {book.title} by {book.author} completed on {book.date}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Books;
