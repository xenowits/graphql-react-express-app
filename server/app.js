const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

//allow cross-origin requests
app.use(cors());

//connect to mlab database

mongoose.connect('mongodb://xenowits:graphql505@ds015574.mlab.com:15574/book_store', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.once('open', () => {
  console.log('connected to database');
});

app.get('/', (req, res) => {
  res.send("hey");
});

app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  }),
);

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`Now listening for requests on port ${ PORT }`);
  // console.log("done");
});
