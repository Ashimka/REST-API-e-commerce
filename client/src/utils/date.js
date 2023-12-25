export const dateFormat = (date) => {
  let formatter = new Intl.DateTimeFormat("ru", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return formatter.format(date);
};
