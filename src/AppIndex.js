import React from 'react'
// import * as BooksAPI from './BooksAPI'
import { getAll } from './BooksAPI'
import './App.css'
import AppContainer from './components/AppContainer'
import Booklist from './BookList'
import Bookshelf from './components/Bookshelf'

class AppIndex extends React.Component {
  state = {
    showSearchPage: false,
    loading: true,
    allBooks: []
  }

  componentDidMount() {
    this.loadData();
  }

  loadData = () => {
    this.setState({ loading: true }, () => {
      getAll()
        .then((allBooks) => this.setState({ allBooks, loading: false }));
    })
  }

  hideSearch = () => {
    this.setState({ showSearchPage: false });
  }

  goToSearch = () => {
    const { history } = this.props;
    const { allBooks } = this.state;
    history.push({
      pathname: '/search',
      state: { allBooks }
    });
  }

  render() {
    const { allBooks, loading } = this.state;
    return (
      <AppContainer title="MyReads App">
        <div className="app">
          <Booklist addBook={this.goToSearch}>
            <Bookshelf
              title="Currently Reading"
              filter="currentlyReading"
              bookList={allBooks}
              onUpdateList={this.loadData}
              loading={loading}
            />
            <Bookshelf
              title="Want to Read"
              filter="wantToRead"
              bookList={allBooks}
              onUpdateList={this.loadData}
              loading={loading}
            />
            <Bookshelf
              title="Read"
              filter="read"
              bookList={allBooks}
              onUpdateList={this.loadData}
              loading={loading}
            />
          </Booklist>
        </div>
      </AppContainer>
    )
  }
}

export default AppIndex;
