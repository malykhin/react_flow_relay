import React from 'react';
import './App.css';
import "./App.css";
import { RelayEnvironmentProvider } from 'react-relay/hooks';
import RelayEnvironment from './relay/RelayEnvironment';
import BackEndSkillsList from "./components/BackEndSkillsList/BackEndSkillsList";
import FrontEndSkillsList from "./components/FrontEndSkillsList/FrontEndSkillsList";

function App() {
  return (
    <div className="App">
      <header>Skills list</header>
      <section>
        <BackEndSkillsList />
        <FrontEndSkillsList />
      </section>
    </div>
  );
}

function AppRoot() {
  return (
    <RelayEnvironmentProvider environment={RelayEnvironment}>
      <App />
    </RelayEnvironmentProvider>
  );
}

export default AppRoot;
