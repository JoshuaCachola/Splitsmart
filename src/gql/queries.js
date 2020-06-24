import gql from 'graphql-tag';

export const ACTIVE_EXPENSES = gql`
  query GetActiveExpenses($userId: Int!) {
    activeExpenses(userId: $userId) {
      description,
      amount,
      createdAt
    }
  }
`;

export const USER_SEARCH = gql`
  query UserSearch($email: String!) {
    user(email: $email) {
      id,
      firstName,
      lastName,
      email
    }
  }
`;

export const GET_FRIENDS = gql`
  query GetFriends($friend1Id: Int!) {
    friends(friend1Id: $friend1Id) {
      friend2 {
        firstName,
        lastName
      }
    }
  }
`;
