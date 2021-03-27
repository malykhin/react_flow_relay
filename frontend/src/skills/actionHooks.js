// @flow
import { useState } from "react";
import type { AreaType, ActionHookReturnType } from "./types";

export function useModalAction(): ActionHookReturnType {
  const [modalOpen, setModalOpen] = useState<boolean, Function>(false);
  const [currentArea, setCurrentArea] = useState<AreaType, Function>({});
  function showModal(area: AreaType) {
    setModalOpen(true);
    setCurrentArea({ ...area });
  }
  function closeModal() {
    setModalOpen(false);
  }

  return { modalOpen, currentArea, showModal, closeModal };
}
