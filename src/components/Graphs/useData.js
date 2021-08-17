import { useContext } from "react";
import { ExpenseTrackerContext } from "../../context/context";

import { resetCategories } from "../../constants/categories";

const useData = (title) => {
  resetCategories();
  const { transactions } = useContext(ExpenseTrackerContext);

  const monthNames = {
    January: "01",
    February: "02",
    March: "03",
    April: "04",
    May: "05",
    June: "06",
    July: "07",
    August: "08",
    September: "09",
    October: "10",
    November: "11",
    December: "12",
  };

  function getKeyByValue(object, value) {
    return Object.keys(object).find((key) => object[key] === value);
  }

  const data = [];
  const months = [];
  transactions.forEach((element) => {
    const date = element.date[5] + element.date[6];
    if (months.includes(date)) {
      return;
    } else {
      months.push(date);
      const IncomeTransactions = transactions.filter(
        (t) =>
          t.type === "Income" && t.date[5] === date[0] && t.date[6] === date[1]
      );
      const ExpenseTransactions = transactions.filter(
        (t) =>
          t.type === "Expense" && t.date[5] === date[0] && t.date[6] === date[1]
      );
      const totalExpense = ExpenseTransactions.reduce(
        (acc, currVal) => (acc += currVal.amount),
        0
      );
      const totalIncome = IncomeTransactions.reduce(
        (acc, currVal) => (acc += currVal.amount),
        0
      );
      const total = totalIncome - totalExpense;

      data.push({
        month: date,
        total: total,
        income: totalIncome,
        expense: totalExpense,
      });
    }
  });

  data.sort((a, b) => a.month - b.month);

  const SortedData = data.map((t) => {
    return {
      month: getKeyByValue(monthNames, t.month),
      total: t.total,
      income: t.income,
      expense: t.expense,
    };
  });

  console.log(SortedData);

  if (title === "bar") {
    const chartData = {
      labels: SortedData.map((t) => t.month),
      datasets: [
        {
          label: "Budget",
          data: SortedData.map((t) => t.total),
          backgroundColor: ["rgba(0, 100, 255, 0.5)"],
          borderColor: ["rgba(50,50,200,0.75"],
          borderWidth: 1,
        },
      ],
    };
    return { chartData };
  } else {
    const chartData = {
      labels: SortedData.map((t) => t.month),
      datasets: [
        {
          label: "Incomes",
          data: SortedData.map((t) => t.income),
          backgroundColor: ["rgba(0, 100, 255, 0.5)"],
          borderColor: ["rgba(50,50,200,0.75"],
          borderWidth: 1,
        },
        {
          label: "Expenses",
          data: SortedData.map((t) => t.expense),
          backgroundColor: ["rgba(255,0,0,0.5"],
          borderColor: ["rgba(200,50,50,0.75)"],
          borderWidth: 1,
        },
      ],
    };

    return { chartData };
  }
  /* const rightTransactions = transactions.filter((t) => t.type === title);
  const total = rightTransactions.reduce(
    (acc, currVal) => (acc += currVal.amount),
    0
  );
  const categories = title === "Income" ? incomeCategories : expenseCategories;

  rightTransactions.forEach((t) => {
    const category = categories.find((c) => c.type === t.category);

    if (category) category.amount += t.amount;
  });

  const filteredCategories = categories.filter((sc) => sc.amount > 0);

  const chartData = {
    datasets: [
      {
        data: filteredCategories.map((c) => c.amount),
        backgroundColor: filteredCategories.map((c) => c.color),
      },
    ],
    labels: filteredCategories.map((c) => c.type),
  };*/
};

export default useData;
