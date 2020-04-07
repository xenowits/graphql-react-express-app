import React, { useState } from 'react';
import { graphql } from 'react-apollo';
import { useQuery } from '@apollo/react-hooks';

import { getBooksQuery } from '../queries/queries'

//components
import { BookDetails } from './bookDetails'

//the graphql package actually
//glues react with apollo
//bind data to react component

//apollo-boost glues grapqhl frontend
//with backend so that graphql queries
//can be made from the frontend

function BookList() {

  const [selected, setSelected] = useState("");

  function liBuilder(books) {
    books.map((book) => {
      console.log("book author ", book.author);
    })
    return books.map((book) => {
          let new_li;
          if (book.author != null) {
            new_li = <li>Author: { book.author.name }</li>
          } else {
            new_li = <li>Sorry no author available</li>
          }
          return (
            <div key={book.id}  onClick={ (e) => {
              setSelected(book.id);
            }}>
              <li>Name: { book.name }</li>
              <li>Genre: { book.genre }</li>
              { new_li }
              <br/>
            </div>
          );
      });
  }

  let { loading, data } = useQuery(getBooksQuery);
  if (loading) {
    return (
      <div>Loading books....</div>
    );
  } else {
    console.log("This is books", data.books);
    return (
      <div id="book-list">
        { liBuilder(data.books) }
        <BookDetails bookId={ selected }/>
      </div>
    );
  }

}

export default BookList;
