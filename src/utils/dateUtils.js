export const dateFormatter = {
  datestringformat: (date) => {
    const newDate = date ? date : new Date();
    const formattedDate = newDate.toISOString().slice(0, 10);
    return formattedDate;
  },
};
