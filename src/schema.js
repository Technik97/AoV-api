const { gql } = require('apollo-server-express');

module.exports = gql`
type Query {
    heroes: [Hero!]!
    hero(id: ID!): Hero
    user(username: String!): User
    users: [User!]!
    me: User!
}

type Hero {
    id: ID!
    name: String!
    category: String!
    role: String!
    favoriteCount: Int!
    commentCount: Int!
    comments: [Comment]
}

type User {
    id: ID!
    username: String!
    avatar: String!
    favHeroes: [Hero!]!
}

type Comment {
    content: String!
    author: User!
}

type Mutation {
    newHero(name: String!, category: String!, role: String!): Hero!
    updateHero(id: ID!, role: String!): Hero!
    deleteHero(id: ID!): Boolean!
    signUp(username: String!, password: String!): String!
    signIn(username: String, password: String!): String!
    toggleFavorite(id: ID!): Hero!
}
`;