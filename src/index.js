const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

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
        type: String!
        role: String!
    }
`;

const resolvers = {
    Query: {
        hello: () => 'Hello World!',
        heroes: () => heroes,
        hero: (parent, args) => {
            return heroes.find(hero => hero.id === args.id );
        }
    }
}

let heroes = [
    { id: '1', name: 'Violet', type: 'Marksman', role: 'adc/jungle'},
    { id: '2', name: "D'arcy", type: 'Mage', role: 'Jungle'},
    { id: '3', name: 'Liliana', type: 'Mage', role: 'Mid' }
];

const app = express();

const port = process.env.PORT || 4000;

//Apollo Server setup
const server = new ApolloServer({ typeDefs, resolvers });

//Apply the Apollo GraphQL middleware and set the path to /api
server.applyMiddleware({ app, path: '/api' })

app.listen({ port }, () => {
    console.log(`GraphQL server running at http://localhost:${port}${server.graphqlPath}`);
});


