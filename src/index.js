const express = require('express');
const { ApolloServer } = require('apollo-server-express');
require('dotenv').config();
const jwt = require('jsonwebtoken');

const db = require('./db');
const models = require('./models');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');


const DB_HOST = process.env.DB_HOST;

//get the user info from a JWT
const getUser = token => {
    if(token){
        try {
            //return the user information from the token
            return jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            //if there is a problem with the token, throw an error
            throw new Error('Session invalid');
        }
    }
} 

const app = express();

const port = process.env.PORT || 4000;

db.connect(DB_HOST);

//Apollo Server setup
const server = new ApolloServer({ 
    typeDefs, 
    resolvers,
    context: ({ req }) => {
        //get the user token from the header
        const token = req.headers.authorization;

        //try to retrieve a user to the console
        const user = getUser(token);

        console.log(user);

        //Add the db models and the user to the context
        return { models, user };
    }
});

//Apply the Apollo GraphQL middleware and set the path to /api
server.applyMiddleware({ app, path: '/api' })

app.listen({ port }, () => {
    console.log(`GraphQL server running at http://localhost:${port}${server.graphqlPath}`);
});


