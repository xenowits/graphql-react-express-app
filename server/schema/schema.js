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
  GraphQLList,
  GraphQLNonNull
} = graphql;

const { AuthorType, BookType } = require('./types.js');

const RootQuery = new GraphQLObjectType({
  name:'RootQueryType',
  fields:{
    book: {
      type: BookType,
      args: {id: {type: GraphQLID}},
      resolve(parent, args) {
        //code to get data from dB/other data sources
        // for (item of books) {
        //   console.log(item);
        //   if (item.id == args.id) {
        //     console.log(typeof(args.id));
        //     return item;
        //   }
        // }
        //lodash implementation
        //return _.find(books, {id:args.id});
        return Book.findById(args.id)
      }
    },
    author: {
      type: AuthorType,
      args: {
        id: {type: GraphQLID}
      },
      resolve(parent, args) {
        //code to get data from dB/other data sources
        //lodash implementation
        // return _.find(authors, {id:args.id});
        return Author.findById(args.id);
      }
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        // return books;
        return Book.find({});
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        // return authors;
        return Author.find({});
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: {type : new GraphQLNonNull(GraphQLString)},
        age: {type: new GraphQLNonNull(GraphQLInt)}
      },
      resolve(parent, args) {
        let author = new Author({
          name: args.name,
          age: args.age
        });
        //instance of author collection created
        //or in other words record is created
        return author.save();
      }
    },
    addBook: {
      type: BookType,
      args: {
        name: {type: new GraphQLNonNull(GraphQLString)},
        genre: {type: new GraphQLNonNull(GraphQLString)},
        authorId: {type: new GraphQLNonNull(GraphQLID)}
      },
      resolve(parent, args) {
        let book = new Book({
          name: args.name,
          genre: args.genre,
          authorId: args.authorId
        });
        return book.save();
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
})
