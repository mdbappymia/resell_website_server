export const formatDate = (date) => {
  const stringDate = new Date(date).toISOString();
  const dateArray = stringDate.split("T");
  const newDate = dateArray[0]; //`${dateArray[2]} ${dateArray[1]} ${dateArray[3]}`;
  console.log(newDate);
  return newDate;
};
