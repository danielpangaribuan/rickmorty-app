import React from 'react';
import ReactDOM from 'react-dom/client';
import { ApolloProvider, ApolloClient, InMemoryCache, gql } from '@apollo/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';

const typeDefs = gql`
  extend type Mutation {
    location(id: String, location: String): String
  }
`;

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "https://rickandmortyapi.com/graphql",
  typeDefs
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
