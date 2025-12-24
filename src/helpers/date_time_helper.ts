export const determineDateOnFilter = (filter: string) => {
  const now = new Date();
  const today = new Date(
    Date.UTC(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      now.getHours(),
      now.getMinutes(),
      now.getSeconds()
    )
  );
  const tomorrow = new Date(
    Date.UTC(now.getFullYear(), now.getMonth(), now.getDate() + 1)
  );
  switch (filter) {
    case "today": {
      const nowStart = new Date(
        Date.UTC(now.getFullYear(), now.getMonth(), now.getDate())
      );
      return [nowStart, today];
    }
    case "mtd": {
      const firstDay = new Date(Date.UTC(now.getFullYear(), now.getMonth(), 1));
      return [firstDay, tomorrow];
    }
    case "ytd": {
      const firstDay = new Date(Date.UTC(now.getFullYear(), 0, 1));
      return [firstDay, tomorrow];
    }
    case "last_year": {
      const firstDay = new Date(Date.UTC(now.getFullYear() - 2, 11, 31));
      const lastDay = new Date(Date.UTC(now.getFullYear() - 1, 11, 31));
      return [firstDay, lastDay];
    }
    case "all_time": {
      return [null, null];
    }
    default:
      return [null, null];
  }
};

// Get the month name from the month number starting from 1.
export const getMonthName = (month: number) => {
  const date = new Date(0);
  date.setMonth(month - 1);
  return date.toLocaleString("default", { month: "short" }).toUpperCase();
};
