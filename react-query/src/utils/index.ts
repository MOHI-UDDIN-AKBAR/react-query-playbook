export const textFormat = (text: string, maxChar: number) => {
  return text.length <= maxChar ? text : `${text.slice(0, maxChar)}...`;
};
