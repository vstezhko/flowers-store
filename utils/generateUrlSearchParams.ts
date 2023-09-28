export const generateUrlSearchParams = (params: Record<string, string>) => {
  return new URLSearchParams(params).toString();
};
