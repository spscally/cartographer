import React from "react";

const Books = ({ api }) => {
  const [books, setBooks] = React.useState([]);

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
