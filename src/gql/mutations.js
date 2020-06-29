import gql from 'graphql-tag';

export const LOGIN_USER = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      authToken,
      id,
      firstName,
      lastName
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
        id,
        firstName,
        lastName
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
        id,
        amount,
        description,
        createdAt,
        isSettled
      }
    }
  }
`;

export const CREATE_TRANSACTION = gql`
  mutation CreateTransaction($userId: Int!, $amount: Float!, $expenseId: Int!) {
    createTransaction(userId: $userId, amount: $amount, expenseId: $expenseId) {
      transaction {
        id
      }
    }
  }
`;

export const CREATE_COMMENT = gql`
  mutation CreateComment($userId: Int!, $expenseId: Int!, $comment: String!) {
    createComment(userId: $userId, expenseId: $expenseId, comment: $comment) {
      comment {
        id
      }
    }
  }
`;

export const HANDLE_FRIEND_REQUEST = gql`
  mutation HandleFriendRequest($id: Int!, $status: String!) {
    handleFriendRequest(id: $id, status: $status) {
      friendRequest {
      id
    }
  }
}
`;

export const HANDLE_TRANSACTION = gql`
  mutation HandleTransaction($id: Int!) {
    handleTransaction(id: $id) {
      transaction {
        id
      }
    }
  }
`;
