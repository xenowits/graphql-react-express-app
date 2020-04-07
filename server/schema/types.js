const graphql = require('graphql');
const _ = require('lodash');

const Book = require('../models/book');
const Author = require('../models/author');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList
} = graphql;

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
      id: {type: GraphQLID},
      name: {type: GraphQLString},
      genre: {type: GraphQLString},
      author: {
        type: AuthorType,
        resolve(parent, args) {
            console.log(parent);
            //return _.find(authors, {id: parent.authorId});
            return Author.findById(parent.authorId);
        }
      }
  })
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    age: {type: GraphQLInt},
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        //return _.filter(books, {authorId: parent.id});
        return Book.find({ authorId: parent.id });
      }
    }
  })
})

module.exports = {
  AuthorType: AuthorType,
  BookType: BookType
}

// export { AuthorType, BookType };
