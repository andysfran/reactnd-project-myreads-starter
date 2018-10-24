import React, { Component } from 'react';

export default class BookList extends Component {
  
  render() {
    return (
      <div className="list-books">
        <div className="list-books-content">
          <div>
            {this.props.children && this.props.children}
          </div>
        </div>
        <div className="open-search">
          <a onClick={() => this.props.addBook() }>Add a book</a>
        </div>
      </div>
    );
  }
}
