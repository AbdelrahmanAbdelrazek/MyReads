import React from "react";
import BookShelf from "./BookShelf";
import { Link } from "react-router-dom";
import propTypes from "prop-types";

function Home(props) {
  const { books, changeShelf } = props;
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <BookShelf
          name="Currently Reading"
          books={Object.values(books).filter(
            (b) => b.shelf === "currentlyReading"
          )}
          changeShelf={changeShelf}
        />
        <BookShelf
          name="Want to Read"
          books={Object.values(books).filter((b) => b.shelf === "wantToRead")}
          changeShelf={changeShelf}
        />
        <BookShelf
          name="Read"
          books={Object.values(books).filter((b) => b.shelf === "read")}
          changeShelf={changeShelf}
        />
      </div>
      <div className="open-search">
        <Link to="/search">
          <button>Add a book</button>
        </Link>
      </div>
    </div>
  );
}

Home.propTypes = {
  books: propTypes.object.isRequired,
  changeShelf: propTypes.func.isRequired,
};

export default Home;
