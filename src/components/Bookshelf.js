import React, { Component } from 'react'
import Book from './Book'

export default class Bookshelf extends Component {

  renderBooks = () => {
    const { bookList } = this.props;
    if (Array.isArray(bookList) && bookList.length > 0) {
      return bookList.filter((book) => book.shelf === this.props.filter)
        .map((book) => <Book key={book.title} {...book} />)
    }

    return null;
  }

  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            { this.renderBooks() }
          </ol>
        </div>
      </div>
    );
  }
}
