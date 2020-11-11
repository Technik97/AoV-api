const { gql } = require('apollo-server-express');

module.exports = gql`
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