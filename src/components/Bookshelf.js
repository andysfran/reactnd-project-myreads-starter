import React, { Component } from 'react'
import { NotificationManager } from 'react-notifications'
import Book from './Book'
import LoadingBook from './LoadingBook'
import { update } from '../BooksAPI'

export default class Bookshelf extends Component {

  onUpdate = (book, status) => {
    update({id: book}, status)
      .then(() => {
        NotificationManager.success('Book moved successfully!');
        this.props.onUpdateList();
      });
  }

  renderBooks = () => {
    const { bookList, loading } = this.props;
    if (loading) {
      return <LoadingBook />;
    }

    if (Array.isArray(bookList) && bookList.length > 0) {
      return bookList.filter((book) => book.shelf === this.props.filter)
        .map((book) => {
          return (
            <Book
              key={book.title}
              onChangeBookStatus={(book, status) => this.onUpdate(book, status)}
              {...book} 
            />
          );
        });
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
