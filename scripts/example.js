const getCamelCase = (folderName, upperFirst = true) => {
  const nameList = folderName.split("-");
  let name = "";
  nameList.forEach((item, index) => {
    if (upperFirst || index) {
      item = item.replace(item[0], item[0].toUpperCase());
    }
    name += item;
  });
  return name;
};

const actionExample = (folderName) => {
  const name = getCamelCase(folderName);
  const lowerNameFirst = getCamelCase(folderName, false);
  return `
import { Dispatch } from "redux";
import { createAction } from "../common";
import ${lowerNameFirst}Api from "./${folderName}.api";
import { I${name}State } from "./${folderName}.interface";

export const Types = {
  setState: "${lowerNameFirst}.setState",
  cleanAll: "${lowerNameFirst}.cleanAll",
  resetState: "${lowerNameFirst}.resetState",
};

const setState = (state: Record<string, any>) =>
  createAction(Types.setState, { state });
const resetState = (stateName: keyof I${name}State) =>
  createAction(Types.resetState, { stateName });
const cleanAll = () => createAction(Types.cleanAll);

export default {
  setState,
  resetState,
  cleanAll
};

`;
};

const apiExample = (folderName) => `
import { AppApi } from "../../commons";

export default {};

`;

const initialStateExample = (folderName) => {
  const name = getCamelCase(folderName);
  return `
import { I${name}State } from "./${folderName}.interface";

const state: I${name}State = {
  isFetching: false,
  message: "",
};
export default state;

`;
};

const interfaceExample = (folderName) => {
  const name = getCamelCase(folderName);
  return `
export interface I${name}State {
  isFetching: boolean;
  message?: string;
}
`;
};

const reducerExample = (folderName) => {
  const name = getCamelCase(folderName);
  const lowerNameFirst = getCamelCase(folderName, false);

  return `
  import produce from "immer";
import { IAction } from "../common";
import ${lowerNameFirst}InitialState from "./${folderName}.initial-state";
import { I${name}State } from "./${folderName}.interface";
import _ from "lodash";
import { Types } from "./${folderName}.action";

export default produce((state: I${name}State, action: IAction) => {
  const data = action.data;
  const message = action.message;
  switch (action.type) {
    case Types.setState: {
      const updatedState = data.state;
      for (const key in updatedState) {
        _.set(state, key, updatedState[key]);
      }
      return state;
    }
    case Types.resetState: {
      const stateName: keyof I${name}State = data.stateName;
      _.set(state, stateName, ${lowerNameFirst}InitialState[stateName]);
      return state;
    }
    case Types.cleanAll: {
      return ${lowerNameFirst}InitialState;
    }

    default: {
      return state;
    }
  }
}, ${lowerNameFirst}InitialState);
`;
};

const indexExample = (folderName) => {
  return `
  export * from "./${folderName}.action";
  export * from "./${folderName}.api";
  export * from "./${folderName}.initial-state";
  export * from "./${folderName}.interface";
  export * from "./${folderName}.reducer";
  export * from "./${folderName}.validator";

  `;
};

const validatorExample = (folderName) => {
  const name = getCamelCase(folderName);
  return `
  import {  } from "class-validator";
  import {  } from "./${folderName}.interface";
  
  export class Create${name}Validator {
    constructor() {
      
    }

  }
  
`;
};

module.exports = {
  apiExample,
  actionExample,
  interfaceExample,
  initialStateExample,
  reducerExample,
  indexExample,
  validatorExample,
};
