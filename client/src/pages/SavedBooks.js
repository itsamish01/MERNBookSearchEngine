import React from "react";
import {
  Jumbotron,
  Container,
  CardGroup,
  Card,
  Button,
} from "react-bootstrap";
import { useQuery, useMutation } from "@apollo/client";

import { QUERY_ME } from "../utils/queries";
import { DELETE_BOOK } from "../utils/mutations";
import { deleteBookId } from "../utils/localStorage";

const MySavedBooks = () => {
  const { loading, data } = useQuery(QUERY_ME);
  const [deleteBook] = useMutation(DELETE_BOOK);

  const userProfile = data?.me || [];

  const handleRemoveBook = async (bookId) => {
    try {
      await deleteBook({ variables: { bookId } });
      deleteBookId(bookId);
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <Jumbotron fluid className="text-light bg-dark">
        <Container>
          <h1>Checking saved books!</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          {userProfile.savedBooks.length
            ? `Checking ${userProfile.savedBooks.length} saved ${
                userProfile.savedBooks.length === 1 ? "book" : "books"
              }:`
            : "No saved books found!"}
        </h2>
        <CardGroup>
          {userProfile.savedBooks.map((book) => {
            return (
              <Card key={book.bookId} border="dark">
                {book.image ? (
                  <Card.Img
                    src={book.image}
                    alt={`Cover for ${book.title}`}
                    variant="top"
                  />
                ) : null}
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <p className="small">Authors: {book.authors}</p>
                  <Card.Text>{book.description}</Card.Text>
                  <Button
                    className="btn-block btn-danger"
                    onClick={() => handleRemoveBook(book.bookId)}
                  >
                    Remove this Book!
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardGroup>
      </Container>
    </>
  );
};

export default MySavedBooks;
