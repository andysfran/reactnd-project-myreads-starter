import React, { Component } from 'react';


export default class Book extends Component {

  changeBookStatus = (e) => {
    const { id } = this.props;
    this.props.onChangeBookStatus(id, e.target.value);
  }

  render() {
    const { title, authors, imageLinks, shelf } = this.props;
    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${imageLinks !== undefined && imageLinks.thumbnail}")` }}></div>
            <div className="book-shelf-changer">
              <select onChange={e => this.changeBookStatus(e)} defaultValue={shelf || 'none'}>
                <option value="move" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{title}</div>
          <div className="book-authors">{authors !== undefined && authors.join(',')}</div>
        </div>
      </li>
    );
  }
}
