import React from "react";
import ReactDOM from "react-dom";
import { ApolloLink } from "apollo-link";
import { ApolloClient } from "apollo-client";
import { ApolloProvider } from "@apollo/react-hooks";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";

import "./index.css";
import App from "./App";

const httpLink1 = createHttpLink({
  uri: "http://localhost:3001/graphql",
});

const httpLink2 = createHttpLink({
  uri: "http://localhost:3002/graphql",
});

const client = new ApolloClient({
  link: ApolloLink.split(
    (operation) => operation.getContext().clientName === "second", // Routes the query to the proper client
    httpLink2,
    httpLink1
  ),
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
