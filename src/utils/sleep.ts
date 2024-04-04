export const sleep = (seconds: number = 1): Promise<boolean> => {
  return new Promise((res) => {
    setTimeout(() => {
      res(true);
    }, seconds * 1000);
  });
};
