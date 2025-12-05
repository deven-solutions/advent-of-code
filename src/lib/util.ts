export const splitOnce = (str: string, sep: string) => {
  const index = str.indexOf(sep);
  return index === -1
    ? [str, '']
    : [str.slice(0, index), str.slice(index + sep.length)];
};

// Add other useful functions here