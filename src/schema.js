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

type User {
    id: ID!
    username: String!
    avatar: String!
    favHeroes: [Hero!]!
}

type Mutation {
    newHero(name: String!, category: String!, role: String!): Hero!
    updateHero(id: ID!, role: String!): Hero!
    deleteHero(id: ID!): Boolean!
    signUp(username: String!, password: String!): String!
    signIn(username: String, password: String!): String!
}
`;