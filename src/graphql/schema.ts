import { buildSchema } from 'graphql';

export const schema = buildSchema(`
  type User {
    id: ID!
    username: String!
    email: String!
    connected: Boolean!
    role: String!
  }

  type Notification {
    id: ID!
    userId: String!
    message: String!
    read: Boolean!
  }

  type Query {
    getUser(id: ID!): User
    getNotifications(userId: String!, page: Int, limit: Int): [Notification]
  }

  type Mutation {
    createUser(username: String!, email: String!, password: String!): User
    createNotification(userId: String!, message: String!): Notification
    markNotificationAsRead(id: ID!): Notification
  }
`);
