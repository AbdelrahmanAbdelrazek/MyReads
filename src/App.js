import React from "react";
import Home from "./components/Home";
import Search from "./components/Search";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";

class BooksApp extends React.Component {
  state = {
    books: {},
  };

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      const allBooks = {};
      books.forEach((b) => {
        allBooks[b.id] = b;
      });
      this.setState({
        books: allBooks,
      });
    });
  }

  changeShelf(book, shelf) {
    BooksAPI.update(book, shelf).then((res) => {
      this.setState((prevState) => ({
        books: {
          ...prevState.books,
          [book.id]: { ...book, shelf: shelf },
        },
      }));
    });
  }

  render() {
    return (
      <Switch>
        <Route exact path="/">
          <Home books={this.state.books} changeShelf={this.changeShelf.bind(this)} />
        </Route>
        <Route path="/search">
          <Search userBooks={this.state.books} changeShelf={this.changeShelf.bind(this)}/>
        </Route>
      </Switch>
    );
  }
}

export default BooksApp;
