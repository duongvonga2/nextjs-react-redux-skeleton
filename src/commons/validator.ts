import { validate, ValidatorOptions } from "class-validator";

export const validateData = async <T extends Record<string, any>>(
  data: T,
  options?: ValidatorOptions
): Promise<Record<keyof T, string>> => {
  const validatorList = await validate(data, options);
  const errors: any = {};
  console.log("validator list", validatorList);
  if (validatorList.length) {
    for (const key in validatorList) {
      const validator = validatorList[key];
      const { property, constraints } = validator;
      const value = Object.values(constraints || { a: "" })[0];
      errors[property] = value;
    }
  }
  return errors;
};
