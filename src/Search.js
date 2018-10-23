import React, { Component } from 'react'
import { debounce } from 'lodash'
import {NotificationManager} from 'react-notifications'
import { search, update } from './BooksAPI'
import Book from './components/Book'
import LoadingBook from './components/LoadingBook'

export default class Search extends Component {

    state = {
      text: '',
      loading: false,
      results: []
    }

  submitSearch = debounce((text) => {
    if (text === "") {
      this.setState({ text, results: [] });
    } else {
      this.setState({ text, loading: true }, () => {
        search(this.state.text)
          .then((response) => {
            if (typeof response === 'object' && 'error' in response) {
              NotificationManager.info('Ops!','No results.');
              this.setState({ results: [], loading: false });
            } else {
              this.setState({ results: response, loading: false });
            }
          })
          .catch((error) => {
            this.setState({ results: undefined, loading: false }, () => {
              NotificationManager.error(`Sorry, but we couldn't process your request.`);
            })
          })
      });
    }
  }, 500);

  onUpdate = (book, status) => {
    update({ id: book }, status)
      .then(() => {
        NotificationManager.success('Book moved successfully!');
      });
  }

  renderBooks = () => {
    if (this.state.loading) {
      return <LoadingBook />
    }

    if (Array.isArray(this.state.results)) {
      if (this.state.results.length > 0) {
        return this.state.results.map((book, index) => {
          return (
            <Book
              key={index}
              onChangeBookStatus={(book, status) => this.onUpdate(book, status)}
              {...book}
            />
          );
        });
      } else {
        return <li>-</li>
      }
    }
    return <li>Unfortunally we can't proccess your request. Try again later...</li>;
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
            <input type="text" placeholder="Search by title or author" onChange={e => this.submitSearch(e.target.value)} />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">{this.renderBooks()}</ol>
        </div>
      </div>
    );
  }
}
