export const deletePrefixKey = (inputObject: Record<string, string>) => {
  const outputObject: Record<string, string> = {};
  for (const key in inputObject) {
    if (inputObject.hasOwnProperty(key)) {
      const newKey = key.replace(/^[^-]+-/, '');
      outputObject[newKey] = inputObject[key];
    }
  }
  return outputObject;
};
