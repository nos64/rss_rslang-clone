const CURRENT_DATE_FOR_STATS = (() => {
  const date = new Date();
  return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
})();

export default CURRENT_DATE_FOR_STATS;
