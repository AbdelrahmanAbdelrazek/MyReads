import React from "react";
import Book from "./Book";
import propTypes from "prop-types";

function BookShelf(props) {
  const { name, books, changeShelf} = props;
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{name}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map((book) => (
            <li key={book.id}>
              <Book
                title={book.title}
                authors={book.authors}
                shelf={book.shelf}
                imageUrl={book.imageLinks && book.imageLinks.thumbnail}
                changeShelf={(newShelf) => changeShelf(book, newShelf)}
              />
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

BookShelf.propTypes = {
  name: propTypes.string,
  books: propTypes.array.isRequired,
  changeShelf: propTypes.func.isRequired
};

export default BookShelf;
