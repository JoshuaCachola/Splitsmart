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
    getFriends(friend1Id: $friend1Id) {
      friend2 {
        firstName,
        lastName
      }
    }
  }
`;

export const GET_RECENT_ACTIVITY = gql`
  query GetRecentActivity($userId: Int!) {
    recentActivity(userId: $userId) {
      ... on Comment {
        comment,
        date,
        user {
          firstName,
          lastName
        },
        expense {
          description,
          amount
        }
      }
      ... on Transaction {
        expense {
          description,
          amount,
          createdAt
        },
        amount,
        paidOn,
        isSettled
      }
    }
  }
`;
