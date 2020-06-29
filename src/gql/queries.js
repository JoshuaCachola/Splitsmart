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
      ... on Friendship {
        updatedAt,
        friend1 {
          firstName,
          lastName
        },
        friend2 {
          firstName,
          lastName
        }
        status
      }
    ... on Friendship {
        id,
      	updatedAt,
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
        status
      }
      ... on Transaction {
        expense {
          description,
          amount,
          createdAt,
          user {
            firstName,
            lastName
          }
        },
        amount,
        paidOn,
        isSettled,
        updatedAt
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
      expense {
        id
      }
      comment,
      date,
      user {
        firstName,
        lastName
      },
    }
  }
`;

export const GET_EXPENSE_TRANSACTIONS = gql`
  query GetExpenseTransactions($expenseId: Int!) {
    getExpenseTransactions(expenseId: $expenseId) {
      amount,
      isSettled,
      user {
        firstName,
        lastName
      }
    }
  }
`;
