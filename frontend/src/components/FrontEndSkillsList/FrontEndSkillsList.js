import React from 'react';
import graphql from "babel-plugin-relay/macro";
import {loadQuery} from "react-relay/hooks";
import RelayEnvironment from "../../relay/RelayEnvironment";
import {usePreloadedQuery} from "react-relay";
import SkillsList from "../SkillsList/SkillsList";
import Loader from "../Loader";
const { Suspense } = React;

const query = graphql`
    query FrontEndSkillsListQuery {
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

const preloadedQuery = loadQuery(RelayEnvironment, query, {});

const FrontEndSkillsList = () => {
  const { frontEnd } = usePreloadedQuery(query, preloadedQuery);
	return (
    <Suspense fallback={<Loader />}>
      <SkillsList data={frontEnd}/>
    </Suspense>
  )
};

export default FrontEndSkillsList;

