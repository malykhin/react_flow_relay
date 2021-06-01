import * as React from 'react';
import './App.css';
import SkillsDashboard from './components/SkillsDashboard';
import fetchGraphQL from './utility/fetchGraphQL';
const { useState, useEffect } = React;

function App(props: {}): React.Node {
	
  const [data, setData] = useState({});

  // When the component mounts we'll fetch a repository name
  useEffect(() => {
    let isMounted = true;
    fetchGraphQL(`
    query AppQuery {
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
      backEnd {
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
    `).then(response => {
      if (!isMounted) {
        return;
      }
      const data = response.data;
      console.log(data)
      setData(data);
    }).catch(error => {
      console.error(error);
    });

    return () => {
      isMounted = false;
    };
  }, [fetchGraphQL]);
	return (
		<div className="App">
		{data.frontEnd && (	<SkillsDashboard data={data} />)}
		</div>
	);
}

export default App;
