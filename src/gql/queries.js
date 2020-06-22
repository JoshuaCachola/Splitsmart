import gql from 'graphql-tag';

// export const ACTIVE_EXPENSES = gql`
//   query GetActiveExpenses() {
//     getActiveExpenses() {

//     }
//   }
// `;

export const USER_SEARCH = gql`
  query UserSearch($email: String!) {
    userSearch(email: $email) {
      user {
        id,
        firstName,
        lastName,
        email
      }
    }
  }
`;
