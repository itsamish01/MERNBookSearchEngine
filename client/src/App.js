import React from "react";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import BookSearch from "./pages/BookSearch";
import MySavedBooks from "./pages/MySavedBooks";
import NavigationBar from "./components/NavigationBar";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("user_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function MainApp() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <>
          <NavigationBar />
          <Switch>
            <Route exact path="/" component={BookSearch} />
            <Route exact path="/saved" component={MySavedBooks} />
            <Route render={() => <h1 className="display-2">Page not found!</h1>} />
          </Switch>
        </>
      </Router>
    </ApolloProvider>
  );
}

export default MainApp;
