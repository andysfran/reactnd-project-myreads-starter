import React, { Component } from 'react'
import { search } from './BooksAPI'
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

  renderBooks = () => {
    if (Array.isArray(this.state.results)) {
      return this.state.results.map((book) => <Book key={book.title} {...book} />);
    }
    return null;
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <a className="close-search" onClick={() => this.props.onHide()}>Close</a>
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
