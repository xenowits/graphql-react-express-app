const RootQuery = new GraphQLObjectType({
  name:'RootQueryType',
  fields:{
    book: {
      type: BookType,
      args: {id: {type: GraphQLID}},
      resolve(parent, args) {
        //code to get data from dB/other data sources
        for (item of books) {
          console.log(item);
          if (item.id == args.id) {
            console.log(typeof(args.id));
            return item;
          }
        }
        //lodash implementation
        //return _.find(books, {id:args.id});
      }
    },
    author: {
      type: AuthorType,
      args: {id: {type: GraphQLID}},
      resolve(parent, args) {
        //code to get data from dB/other data sources
        //lodash implementation
        return _.find(authors, {id:args.id});
      }
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return books;
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        return authors;
      }
    }
  }
});

module.exports = RootQuery;
