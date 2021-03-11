// @flow
// React
import * as React from "react";
import ReactDOM from "react-dom";

// CSS
import "./index.css";

// reporting
import reportWebVitals from "./reportWebVitals";

// Libs [relay]
import { QueryRenderer, graphql } from "react-relay";
import {
  Environment,
  Network,
  RecordSource,
  Store,
  type RequestNode,
  type Variables,
  type FragmentReference,
} from "relay-runtime";

// App
import App from "./App";

// Types
type appQueryResponse = {|
  +user: ?{|
    +$fragmentRefs: FragmentReference,
  |},
|};

// Query
async function fetchQuery(
  operation: RequestNode,
  variables: Variables
): Promise<{}> {
  const response = await fetch("/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: operation.text,
      variables,
    }),
  });

  return response.json();
}

const modernEnvironment: Environment = new Environment({
  network: Network.create(fetchQuery),
  store: new Store(new RecordSource()),
});

const Root = () => (
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.render(
    <QueryRenderer
      environment={modernEnvironment}
      query={graphql`
        query srcQuery {
          backEnd {
            name
          }
        }
      `}
      variables={{}}
      render={({
        error,
        props,
      }: {
        error: ?Error,
        props: ?appQueryResponse,
      }) => {
        if (props && props.user) {
          return <App />;
        } else if (error) {
          return <div>{error.message}</div>;
        }

        return <div>>Loading...</div>;
      }}
    />,
    rootElement
  );
}

// ReactDOM.render(<Root />, document.getElementById("root"));
