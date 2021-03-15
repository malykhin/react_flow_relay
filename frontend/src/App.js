// @flow

import "./App.css";
import React from "react";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import Skills from "./skills/Skills";

// apollo client setup
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache()
});

function App(): React$Element<any> {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <header># To Do</header>
        <Skills />
      </div>
    </ApolloProvider>
  );
}

export default App;
