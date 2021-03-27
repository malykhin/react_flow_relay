// @flow

import React, { useCallback } from "react";
import Section from "./Section";
import AddSkillModal from "./AddSkillModal";
import { useDataService } from "./dataHooks";
import { useModalAction } from "./actionHooks";
import type { DataHookReturnType, ActionHookReturnType } from "./types";

type Props = {
  preLoadedQuery: Object
};

export default function Skills({ preLoadedQuery }: Props): React$Element<any> {
  const { frontEnd, backEnd, saveData }: DataHookReturnType = useDataService(
    preLoadedQuery
  );
  const {
    modalOpen,
    showModal,
    closeModal,
    currentArea
  }: ActionHookReturnType = useModalAction();

  const handleSave = useCallback(
    async data => {
      await saveData(currentArea.areaId, data.skill);
      closeModal();
    },
    [saveData, closeModal, currentArea.areaId]
  );

  return (
    <>
      <div className="flex-box">
        <Section
          sectionData={frontEnd}
          listClickListener={useCallback(
            () => showModal({ areaId: frontEnd.id, name: frontEnd.name }),
            [showModal, frontEnd]
          )}
        />
        <Section
          sectionData={backEnd}
          listClickListener={useCallback(
            () => showModal({ areaId: backEnd.id, name: backEnd.name }),
            [showModal, backEnd]
          )}
        />
      </div>
      <AddSkillModal
        open={modalOpen}
        title={currentArea.name}
        closeListener={useCallback(() => closeModal(), [closeModal])}
        saveListener={handleSave}
      />
    </>
  );
}
