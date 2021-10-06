const { MongoClient, Server } = require('mongodb');
const gql = require('gql-tag');
const mongoose = require('mongoose');
const { ApolloServer } = require('apollo-server');

const MONGODB = require('./config');

let customerSchema = new mongoose.Schema({
  name: String,
  age: Number,
  email: String,
})

const Customer = mongoose.model('Customer', customerSchema);

const server = new ApolloServer({
  typeDefs,
  resolvers
});

mongoose
  .connect(MONGODB, { useNewUrlParser: true })
  .then(() => {
    console.log('MONGODB connected!');
    return server.listen({port: 5000})
  })