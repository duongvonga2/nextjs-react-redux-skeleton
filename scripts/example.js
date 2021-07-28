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

const actionExample = (folderName) => `
import { createAction } from "../common";
import ${folderName}Api from "./${folderName}.api";

export const Types = {
  setState: "${folderName}.setState",
};

export default {};

`;

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
  return `
  import produce from "immer";
import { IAction } from "../common";
import ${folderName}InitialState from "./${folderName}.initial-state";
import { I${name}State } from "./${folderName}.interface";

export default produce((state: I${name}State, action: IAction) => {
  const data = action.data;
  const message = action.message;
  switch (action.type) {
    default: {
      return state;
    }
  }
}, ${folderName}InitialState);
`;
};

const indexExample = (folderName) => {
  return `
  export * from "./${folderName}.action";
  export * from "./${folderName}.api";
  export * from "./${folderName}.initial-state";
  export * from "./${folderName}.interface";
  export * from "./${folderName}.reducer";

  `;
};

module.exports = {
  apiExample,
  actionExample,
  interfaceExample,
  initialStateExample,
  reducerExample,
  indexExample,
};
