import React from 'react';
import './App.css';
import "./App.css";
import fetchGraphQL from './relay/fetchGraphQL';
import graphql from 'babel-plugin-relay/macro';
import {
  RelayEnvironmentProvider,
  loadQuery,
  usePreloadedQuery,
} from 'react-relay/hooks';
import RelayEnvironment from './relay/RelayEnvironment';
import {ReactNode} from "react";
const { Suspense } = React;

// Define a query
const AreaNameQuery = graphql`
    query AppAreaNameQuery {
        frontEnd {
            id
            name
            skills {
                edges {
                    node {
                        id
                        name
                    }
                }
            }
        }
    }
`;

// Immediately load the query as our app starts. For a real app, we'd move this
// into our routing configuration, preloading data as we transition to new routes.
const preloadedQuery = loadQuery(RelayEnvironment, AreaNameQuery, {
  /* query variables */
});

function App(props) {
  const data = usePreloadedQuery(AreaNameQuery, props.preloadedQuery);
  console.log(data);
  return (
    <div className="App">
      <header># To Do</header>
    </div>
  );
}

function AppRoot() {
  return (
    <RelayEnvironmentProvider environment={RelayEnvironment}>
      <Suspense fallback={'Loading...'}>
        <App preloadedQuery={preloadedQuery} />
      </Suspense>
    </RelayEnvironmentProvider>
  );
}

export default AppRoot;
