import React from "react";
import propTypes from "prop-types";

function Book(props) {
  const { title, imageUrl, shelf="none", authors, changeShelf } = props;
  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 193,
            backgroundImage: imageUrl? `url(${imageUrl})` : 'url("https://i.imgur.com/yWnVI7Y.png")',
          }}
        ></div>
        <div className="book-shelf-changer">
          <select defaultValue={shelf} onChange={(event)=>{changeShelf(event.target.value)}}>
            <option value="move" disabled>
              Move to...
            </option>
            <option
              disabled={shelf === "currentlyReading"}
              value="currentlyReading"
            >
              Currently Reading
            </option>
            <option disabled={shelf === "wantToRead"} value="wantToRead">
              Want to Read
            </option>
            <option disabled={shelf === "read"} value="read">
              Read
            </option>
            <option disabled={shelf === "none"} value="none">
              None
            </option>
          </select>
        </div>
      </div>
      <div className="book-title">{title}</div>
      {authors && authors.map((a, index) => (
        <div className="book-authors" key={index}>
          {a}
        </div>
      ))}
    </div>
  );
}

Book.propTypes = {
  title: propTypes.string.isRequired,
  shelf: propTypes.string,
  imageUrl: propTypes.string,
  authors: propTypes.array,
  changeShelf: propTypes.func.isRequired
};

export default Book;
