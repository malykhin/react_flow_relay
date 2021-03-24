// @flow

export type KeyValueType = {
  id: string,
  name: string
};

export type NodeType = {
  node: KeyValueType
};

export type FieldsType = {
  id: string,
  name: string,
  skills: {
    edges: Array<NodeType>
  }
};

export type DataStateType = {
  frontEnd: FieldsType,
  backEnd: FieldsType
};

export type ActionType = {
  type: string,
  payload: Object
};

export type AreaType = {
  areaId: string,
  name: string
};

export type DataHookReturnType = {
  frontEnd: FieldsType,
  backEnd: FieldsType,
  saveData: Function,
  isLoading: boolean
};

export type ActionHookReturnType = {
  modalOpen: boolean,
  currentArea: AreaType,
  showModal: Function,
  closeModal: Function
};
