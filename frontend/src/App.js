// @flow

import "./App.css";
import React, { Suspense } from "react";
import { RelayEnvironmentProvider, loadQuery } from "react-relay/hooks";
import RelayEnvironment from "./RelayEnvironment";
import { GET_SKILLS } from "./skills/queries";
import Skills from "./skills/Skills";

const skillsPreLoadedQuery = loadQuery(RelayEnvironment, GET_SKILLS, {});

function App(): React$Element<any> {
  return (
    <RelayEnvironmentProvider environment={RelayEnvironment}>
      <Suspense fallback={<h1>Loading...</h1>}>
        <div className="App">
          <header># To Do</header>
          <Skills preLoadedQuery={skillsPreLoadedQuery}/>
        </div>
      </Suspense>
    </RelayEnvironmentProvider>
  );
}

export default App;
