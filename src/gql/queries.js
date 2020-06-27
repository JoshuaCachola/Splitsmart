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
  query GetFriends($friendId: Int!) {
    getFriends(friendId: $friendId) {
      friend1 {
        id,
        firstName,
        lastName
      },
      friend2 {
        id,
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

export const GET_ACTIVE_TRANSACTIONS = gql`
  query GetActiveTransactions($userId: Int!) {
    activeTransactions(userId: $userId) {
      id,
      amount,
      paidOn,
      expense {
        id,
        amount,
        description,
        isSettled,
        createdAt
        user {
          firstName,
          lastName
        }
      }
    }
  }
`;

export const GET_EXPENSE_COMMENTS = gql`
  query GetExpenseComments($expenseId: Int!) {
    getExpenseComments(expenseId: $expenseId) {
      comment,
      date,
      user {
        firstName,
        lastName
      },
    }
  }
`;
