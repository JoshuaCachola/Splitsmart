import gql from 'graphql-tag';

// export const ACTIVE_EXPENSES = gql`
//   query GetActiveExpenses() {
//     getActiveExpenses() {

//     }
//   }
// `;

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
  query GetFriends($userId: Int!) {
    friends(userId: $userId) {
      user {
        firstName,
        lastName
      }
    }
  }
`;
