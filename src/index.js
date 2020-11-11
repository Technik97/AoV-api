const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
require('dotenv').config();

const db = require('./db');
const models = require('./models');

const DB_HOST = process.env.DB_HOST;

//construct a schema
const typeDefs = gql`
    type Query {
        hello: String
        heroes: [Hero!]!
        hero(id: ID!): Hero
    }

    type Hero {
        id: ID!
        name: String!
        category: String!
        role: String!
    }

    type Mutation {
        newHero(name: String!, category: String!, role: String!): Hero!
    }
`;

const resolvers = {
    Query: {
        hello: () => 'Hello World!',
        heroes: async () => {
            return await models.Hero.find();
        },
        hero: async (parent, args) => {
            return await models.Hero.findById(args.id);
        }
    },

    Mutation: {
        newHero: async (parent, args) => {
            return await models.Hero.create({
                name: args.name,
                category: args.category,
                role: args.role
            });
        }
    }
}


const app = express();

const port = process.env.PORT || 4000;

db.connect(DB_HOST);

//Apollo Server setup
const server = new ApolloServer({ typeDefs, resolvers });

//Apply the Apollo GraphQL middleware and set the path to /api
server.applyMiddleware({ app, path: '/api' })

app.listen({ port }, () => {
    console.log(`GraphQL server running at http://localhost:${port}${server.graphqlPath}`);
});


