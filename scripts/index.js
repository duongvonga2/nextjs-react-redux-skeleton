const fs = require("fs");
const pathProp = require("path");
const {
  actionExample,
  apiExample,
  indexExample,
  initialStateExample,
  interfaceExample,
  reducerExample,
  validatorExample,
} = require("./example");

const fileList = [
  "initial-state.ts",
  "api.ts",
  "action.ts",
  "interface.ts",
  "index.ts",
  "reducer.ts",
  "validator.ts",
];

const getExample = (afterFixName, folderName) => {
  switch (afterFixName) {
    case "initial-state.ts": {
      return initialStateExample(folderName);
    }
    case "api.ts": {
      return apiExample(folderName);
    }
    case "action.ts": {
      return actionExample(folderName);
    }
    case "interface.ts": {
      return interfaceExample(folderName);
    }
    case "index.ts": {
      return indexExample(folderName);
    }
    case "reducer.ts": {
      return reducerExample(folderName);
    }
    case "validator.ts": {
      return validatorExample(folderName);
    }
    default:
      "";
  }
};

(async () => {
  const [nodePath, filePath, ...folderNameList] = process.argv;
  for (const index in folderNameList) {
    const folderName = folderNameList[index];

    const path = pathProp.resolve(__dirname, "../redux", folderName);
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path);
    }
    fileList.forEach((name) => {
      const fileName = name !== "index.ts" ? folderName + "." + name : name;
      const filePath = path + "/" + fileName;
      if (fs.existsSync(filePath)) {
        return;
      }
      const example = getExample(name, folderName);
      fs.writeFileSync(filePath, example, { encoding: "utf8" });
    });
  }
})();
