import React from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';

//the graphql package actually
//glues react with apollo
//bind data to react component

//apollo-boost glues grapqhl frontend
//with backend so that graphql queries
//can be made from the frontend

const getBooksQuery = gql`
  {
    books {
      name
      id
    }
  }
`;

function BookList(props) {
  //console.log(props);
  function displayBooks() {
      let data = props.data;
      if (data.loading) {
        return (
          <div>Loading books....</div>
        );
      } else {
        return data.books.map(book => {
          return (
            <li key={book.id}>{ book.name }</li>
          )
        });
      }
  }

  return (
    <div>
      <ul id="book-list"></ul>
        { displayBooks() }
    </div>
  );
}

export default graphql(getBooksQuery)(BookList);
