const getKRTime = (date: Date) => {
  const offset = new Date().getTimezoneOffset() * 60000;
  const krTime = new Date(date.getTime() - offset);
  return krTime;
};

export default getKRTime;