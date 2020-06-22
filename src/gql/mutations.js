import gql from 'graphql-tag';

export const LOGIN_USER = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    logIn(email: $email, password: $password) {
      authToken
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

export const ADD_FRIEND = gql`
  mutation AddFriend($userId: Int!, $friendId: Int!) {
    addFriend(userId: $userId, friendId: $friendId) {
      addFriendSuccess,
      addUsersFriendSuccess
    }
  }
`;

export const CREATE_EXPENSE = gql`
  mutation CREATE_EXPENSE($userId: Int!, $amount: Float!, $description: String!) {
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
