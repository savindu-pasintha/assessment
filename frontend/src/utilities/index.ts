export const calculateDaysWorked = (startDate:string) => {
    const start = new Date(startDate);
    const current = new Date();
    const differenceInTime = current.getTime() - start.getTime();
    const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));
    return differenceInDays;
  };
  