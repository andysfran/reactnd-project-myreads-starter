import React from 'react'
// import * as BooksAPI from './BooksAPI'
import { getAll } from './BooksAPI'
import './App.css'
import Booklist from './BookList'
import Bookshelf from './components/Bookshelf'

class AppIndex extends React.Component {
  state = {
    showSearchPage: false,
    allBooks: []
  }

  componentDidMount() {
    this.loadData();
  }

  loadData = () => {
    getAll()
      .then((allBooks) => this.setState({ allBooks }));
  }

  hideSearch = () => {
    this.setState({ showSearchPage: false });
  }

  goToSearch = () => {
    const { history } = this.props;
    history.push('/search');
  }

  render() {
    const { allBooks } = this.state;
    return (
      <div className="app">
        <Booklist addBook={this.goToSearch}>
          <Bookshelf
            title="Currently Reading"
            filter="currentlyReading"
            bookList={allBooks}
            onUpdateList={this.loadData}
          />
          <Bookshelf
            title="Want to Read"
            filter="wantToRead"
            bookList={allBooks}
            onUpdateList={this.loadData}
          />
          <Bookshelf
            title="Read"
            filter="read"
            bookList={allBooks}
            onUpdateList={this.loadData}
          />
        </Booklist>
      </div>
    )
  }
}

export default AppIndex;
