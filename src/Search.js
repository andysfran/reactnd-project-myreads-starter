import React, { Component } from 'react'
import { search, update } from './BooksAPI'
import Book from './components/Book'

export default class Search extends Component {

  state = {
    text: '',
    results: undefined
  }

  submitSearch = (e) => {
    if (e.key === 'Enter') {
      this.setState({ text: e.target.value }, () => {
        search(this.state.text)
          .then((response) => {
            if (typeof response === 'object' && 'error' in response) {
              alert(response.error);
            } else {
              this.setState({ results: response });
            }
          })
          .catch((error) => {
            console.error(error);
            this.setState({ results: undefined }, () => {
              alert(`Sorry, but we couldn't process your request.`)
            })
          })
      });
    } else {
      this.setState({ text: e.target.value });
    }
  }

  onUpdate = (book, status) => {
    update({ id: book }, status)
      .then(() => {
        //Show Alert!
      });
  }

  renderBooks = () => {
    if (Array.isArray(this.state.results)) {
    return this.state.results.map((book) => {
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

  goToIndex = () => {
    const { history } = this.props;
    history.push('/');
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <a className="close-search" onClick={() => this.goToIndex()}>Close</a>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author" onKeyPress={e => this.submitSearch(e)} />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">{this.renderBooks()}</ol>
        </div>
      </div>
    );
  }
}
