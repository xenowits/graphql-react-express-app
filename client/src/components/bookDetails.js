import React from 'react';
import { graphql } from 'react-apollo';
import { useQuery } from '@apollo/react-hooks';
import { getBookQuery } from '../queries/queries';

function BookDetails(props) {
  console.log("props is ", props);
  let { loading, data } = useQuery(getBookQuery, {
    variables: {
      id: props.bookId
    },
  });
  let ele =<p>Book not selected</p>;
  if (loading) {
    ele = <p>Loading please wait!!</p>
  } else if (!loading && data) {
    let internal_ele;
    if (data.book.author) {
      internal_ele = (
        <div>
          <p>Author Details:</p>
          <p>AuthorName is : {data.book.author.name}</p>
          <p>AuthorAge is : {data.book.author.age}</p>
        </div>
      );
    } else {
      internal_ele = <p>Sorry author details are not available</p>;
    }
    ele = (
      <div>
        <p>BookName is : { data.book.name }</p>
        <p>Genre is : { data.book.genre }</p>
        { internal_ele }
      </div>
    );
    console.log("getBookQuery data ", data);
  }
  return (
    <div id="book-details">
      <p>Book details here</p>
      { ele }
    </div>
  );
}

export { BookDetails };
