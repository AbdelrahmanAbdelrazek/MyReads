import React from "react";
import * as BooksAPI from "../BooksAPI";
import { Link } from "react-router-dom";
import BookShelf from "./BookShelf";
import { throttle } from "throttle-debounce";
import propTypes from "prop-types";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = { q: "", books: {} };
    this.searchThrottled = throttle(500, this.search); //Throttled search: You can call the search API only once every 500ms
  }

  search(value) {
    const { userBooks } = this.props;
    BooksAPI.search(value).then((books) => {
      if (!books || books.error) this.setState({ books: {} });
      else {
        const allBooks = {};
        books.forEach((b) => {
          allBooks[b.id] = userBooks[b.id] || b; //if the book in userBooks get it from there. to maintain shelf state across home and search.
        });
        this.setState({
          books: allBooks,
        });
      }
    });
  }

  onUpdate(book, shelf) {
    BooksAPI.update(book, shelf).then((res) => {
      this.setState((prevState) => ({
        books: {
          ...prevState.books,
          [book.id]: { ...book, shelf: shelf },
        },
      }));
    });
  }

  changeQuery(event) {
    this.setState({ q: event.target.value }, () => {
      this.searchThrottled(this.state.q); //throttled search
    });
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/">
            <button className="close-search">Close</button>
          </Link>
          <div className="search-books-input-wrapper">
            {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.q}
              onChange={this.changeQuery.bind(this)}
            />
          </div>
        </div>
        <BookShelf
          books={Object.values(this.state.books)}
          changeShelf={this.onUpdate.bind(this)}
        />
      </div>
    );
  }
}

Search.propTypes = {
  userBooks: propTypes.object,
  changeShelf: propTypes.func.isRequired,
};

export default Search;
