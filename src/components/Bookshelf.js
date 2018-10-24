import React, { Component } from 'react'
import { NotificationManager } from 'react-notifications'
import Book from './Book'
import LoadingBook from './LoadingBook'
import { update } from '../BooksAPI'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import { withStyles } from '@material-ui/core/styles'

class Bookshelf extends Component {

  onUpdate = (book, status) => {
    update({id: book}, status)
      .then(() => {
        NotificationManager.success('Book moved successfully!');
        this.props.onUpdateList();
      });
  }

  renderBooks = () => {
    const { bookList, loading, filter } = this.props;
    if (loading) {
      return <LoadingBook />;
    }

    if (Array.isArray(bookList) && bookList.length > 0) {
      return bookList.filter((book) => book.shelf === filter)
        .map((book, index) => {
          return (
            <Book
              key={`${book.title}-${index}`}
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
      <Grid>
        <Grid item xs={11} md={11} lg={11} xl={11} style={{ margin: 'auto', marginTop: 10 }}>
          <Typography component="h2" variant="h5" color="secondary" gutterBottom>
            {this.props.title}
          </Typography>
        </Grid>
        <Grid>
          <Card xs={12} md={12} lg={12} xl={12} style={{ margin: '5px' }}>
            <ol className="books-grid">
              { this.renderBooks() }
            </ol>
          </Card>
        </Grid>
      </Grid>
    );
  }
}

const styles = theme => ({
  card: {
    marginBottom: theme.spacing.unit
  }
});

export default withStyles(styles)(Bookshelf);
