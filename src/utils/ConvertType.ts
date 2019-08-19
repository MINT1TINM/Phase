const encodeUnicode = (str: string) => {
  const res = [];
  for (let i = 0; i < str.length; i++) {
    res[i] = ("00" + str.charCodeAt(i).toString(16)).slice(-4);
  }
  return "\\u" + res.join("\\u");
};

export { encodeUnicode };
