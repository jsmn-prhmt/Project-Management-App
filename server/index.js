const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const connectDB = require('./config/db');
const port = process.env.PORT;

const app = express();

// Connect to database
connectDB();

// serve react content
app.use(express.static(path.join(__dirname, '../client/build')));
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

app.use(cors());

app.use( 
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === 'development',
  })
);

app.listen(port, console.log(`Server running on port ${port}`));
