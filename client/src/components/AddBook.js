import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../queries/queries'

//the graphql package actually
//glues react with apollo
//bind data to react component

//apollo-boost glues grapqhl frontend
//with backend so that graphql queries
//can be made from the frontend

function AuthorList() {
  //add state to AuthorList functional component
  const [name, setName] = useState("");
  const [genre, setGenre] = useState("");
  const [authorId, setAuthorId] = useState("");
  //here states are initialised and setState methods
  //also created
  function liAuthorBuilder(authors) {
      return authors.map(author => {
        return <option key={ author.id } value={ author.id }>
          { author.name }
        </option>
      }
    );
  }

  let { loading, data } = useQuery(getAuthorsQuery);
  let [ addBook ] = useMutation(addBookMutation);

  function handleSubmit(e) {
    e.preventDefault();
    let obj = {name, genre, authorId};
    console.log(obj);
    addBook({
        variables : obj,
        refetchQueries: [{ query: getBooksQuery }]
    });
  }

  if (loading) {
    return (
      <option disabled>Loading Authors..</option>
    );
  } else {
    return (
      <div>
        <form id="add-book" onSubmit={handleSubmit}>

            <div className="field">
                <label htmlFor="bookName">Book Name</label>
                <input type="text" name="BookName" onChange={(e) => {
                  setName(e.target.value);
                }}/>
            </div>

            <div className="field">
                <label htmlFor="genre">Genre</label>
                <input type="text" name="genre" onChange={(e) => {
                  setGenre(e.target.value);
                }}/>
            </div>

            <div className="field">
                <label htmlFor="authorName">Author:</label>
                <select name="selectAuthor" onChange={(e) => {
                    setAuthorId(e.target.value)
                  }
                }>
                  { liAuthorBuilder(data.authors) }
                </select>
            </div>

            <button name="button">+</button>

        </form>
      </div>
    );
  }

}

export default AuthorList;
