import { gql } from "@apollo/client";

export const GET_CURRENT_USER = gql`
  {
    currentUser {
      id
      username
      email
      bookCount
      savedBooks {
        bookId
        authors
        description
        title
        image
        link
      }
    }
  }
`;
