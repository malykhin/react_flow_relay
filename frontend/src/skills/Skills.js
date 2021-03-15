// @flow

import React from "react";
import { useQuery } from "@apollo/client";
import { GET_SKILLS } from "./queries";
import Section from "./Section";
import AddSkillModal from "./AddSkillModal";
import { useState } from "react";

type nodeType = {
  node: {
    id: string,
    name: string
  }
};

type fieldsType = {
  name: string,
  skills: {
    edges: Array<nodeType>
  }
};

type dataType = {
  frontEnd: {
    ...fieldsType
  },
  backEnd: {
    ...fieldsType
  }
};

export default function Skills(): React$Element<any> {
  const { data, loading } = useQuery<dataType, Boolean>(GET_SKILLS);
  const [modalOpen, setModalOpen] = useState<boolean, Function>(false);
  const handleListClick = () => {
    setModalOpen(true);
  };
  const handleModalclose = () => {
    setModalOpen(false);
  };
  if (loading) return <h1>Loading...</h1>;
  return (
    <>
      <div className="flex-box">
        <Section
          sectionData={data}
          dataKey="frontEnd"
          listClickListener={handleListClick}
        />
        <Section
          sectionData={data}
          dataKey="backEnd"
          listClickListener={handleListClick}
        />
      </div>
      <AddSkillModal open={modalOpen} closeListener={handleModalclose} />
    </>
  );
}
