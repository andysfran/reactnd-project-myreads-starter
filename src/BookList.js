import React, { Component } from 'react';

export default class BookList extends Component {

  goToSearch = () => {
    const { history } = this.props;
    history.push('/search');
  }

  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
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
