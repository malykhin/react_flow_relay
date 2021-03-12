// @flow

import "./App.css";
import React from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import BackEndList from "./skills/BackEndList";

// apollo client setup
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql"
});

function App(): React$Element<any> {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <header># To Do</header>
        <BackEndList />
      </div>
    </ApolloProvider>
  );
}

export default App;
