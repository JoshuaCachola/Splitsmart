import gql from 'graphql-tag';

export const LOGIN_USER = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      authToken,
      id
    }
  }
`;

export const CREATE_USER = gql`
  mutation CreateUser(
    $firstName: String!, $lastName: String!, $email: String!,
    $password: String!) {
    createUser(firstName: $firstName, lastName: $lastName,
      email: $email, password: $password) {
      user {
        id
      }
      authToken
    }
  }
`;

export const FRIEND_REQUEST = gql`
  mutation FriendRequest($friend1Id: Int!, $friend2Id: Int!) {
    friendshipRequest(friend1Id: $friend1Id, friend2Id: $friend2Id) {
      friendshipStatus
    }
  }
`;

export const CREATE_EXPENSE = gql`
  mutation CreateExpense($userId: Int!, $amount: Float!, $description: String!) {
    createExpense(userId: $userId, amount: $amount, description: $description) {
      expense {
        amount,
        description,
        createdAt,
        isSettled
      }
    }
  }
`;
