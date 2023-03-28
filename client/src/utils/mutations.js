import { gql } from "@apollo/client";

export const USER_LOGIN = gql`
  mutation userLogin($email: String!, $password: String!) {
    userLogin(email: $email, password: $password) {
      token
      user {
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
  }
`;

export const REGISTER_USER = gql`
  mutation registerUser($username: String!, $email: String!, $password: String!) {
    registerUser(username: $username, email: $email, password: $password) {
      token
      user {
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
  }
`;

export const ADD_BOOK = gql`
  mutation addBook($input: BookInput) {
    addBook(input: $input) {
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

export const DELETE_BOOK = gql`
  mutation deleteBook($bookId: ID!) {
    deleteBook(bookId: $bookId) {
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
