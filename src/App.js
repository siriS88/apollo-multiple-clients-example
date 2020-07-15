import React, { Component } from "react";
import { useQuery, useApolloClient } from "@apollo/react-hooks";
import gql from "graphql-tag";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <main>
          <p className="App-intro">
            Two Apollo clients consuming two different GraphQL APIs. Switching
            between the two servers using context passed from queries/mutations
          </p>
          <div className="App-container">
            <div className="App-container-item" key="1">
              <QueryUsingClient1 />
            </div>
            <div className="App-container-item" key="2">
              <QueryUsingClient2 />
            </div>
          </div>
        </main>
      </div>
    );
  }
}

const storeQuery = gql`
  query {
    stores {
      edges {
        name
        id
      }
      totalCount
    }
  }
`;

const QueryUsingClient1 = () => {
  const { error, loading, data } = useQuery(storeQuery);
  const apolloClient = useApolloClient();
  console.log("Query1 cache", apolloClient.cache);

  if (error) return "Error!";
  if (loading) return "Loading!";

  if (data) {
    const stores = data.stores;
    return (
      <ul>
        <h3>Client 1 providing stores</h3>
        <p>{`${stores.totalCount} stores!`}</p>
        {stores.edges.map((store, index) => {
          return (
            <li
              key={`${store.name}-${store.id}-${index}`}
            >{`Name: ${store.name} - Id: ${store.id}`}</li>
          );
        })}
      </ul>
    );
  }
};

const cityQuery = gql`
  query {
    cities {
      edges {
        name
        id
      }
      totalCount
    }
  }
`;

const QueryUsingClient2 = () => {
  const { error, loading, data } = useQuery(cityQuery, {
    context: { clientName: "second" },
  });

  const apolloClient = useApolloClient();
  console.log("Query2 cache", apolloClient.cache);

  if (error) return "Error!";
  if (loading) return "Loading!";

  if (data) {
    const cities = data.cities;
    return (
      <ul>
        <h3>Swtiching client uri to get cities</h3>
        <p>{`${cities.totalCount} cities!`}</p>
        {cities.edges.map((city, index) => {
          return (
            <li
              key={`${city.name}-${city.id}-${index}`}
            >{`Name: ${city.name} - Id: ${city.id}`}</li>
          );
        })}
      </ul>
    );
  }
};

export default App;
