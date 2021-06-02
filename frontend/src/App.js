// @flow

import React, { Suspense, useState, useEffect } from 'react';

import SkillsDashboard from './components/SkillsDashboard';
import { RelayEnvironmentProvider, loadQuery } from 'react-relay/hooks';
import RelayEnvironment from './utility/RelayEnvironment';
import { getSkillQuery } from './utility/query';
import './App.css';

const skillsPreLoadedQuery = loadQuery(RelayEnvironment, getSkillQuery, {});

function App(props: {}): React.Node {
	return (
		<RelayEnvironmentProvider environment={RelayEnvironment}>
			<Suspense fallback={<h1>Loading...</h1>}>
				<div className="App">
					<header># To Do</header>
					<SkillsDashboard preLoadedQuery={skillsPreLoadedQuery} />
				</div>
			</Suspense>
		</RelayEnvironmentProvider>
	);
}

export default App;
