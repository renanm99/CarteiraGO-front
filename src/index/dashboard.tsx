import { Sidepanel } from "./sidepanel";
import React, { useEffect, useState } from "react";
import { Expense } from "./model/expense";
import { Income } from "./model/income";

interface account {
  Id: number;
  UserId: number;
  Title: string;
  Type: string;
  Description: string;
  Value: number;
}

export function DashboardPage() {
  const [expenses, setExpenses] = useState<account[]>([]);
  const [incomes, setIncomes] = useState<account[]>([]);
  const [error, setError] = useState<string | null>(null);

  const accountExpense = new Expense();
  const accountIncome = new Income();

  useEffect(() => {
    async function fetchData() {
      try {
        const dataExpense = await accountExpense.getAccounts();
        if (dataExpense) setExpenses(dataExpense);
        const dataIncome = await accountIncome.getAccounts();
        if (dataIncome) setIncomes(dataIncome);
      } catch (err) {
        setError(err.message);
      }
    }
    fetchData();
  }, []);

  return (
    <main className="">
      <div className="z-50 fixed md:flex">
        <div className="">
          <Sidepanel />
        </div>
      </div>
      <div className="md:block translate-x-0 md:translate-x-40 h-full md:w-10/12">
        dash
        {/*<TableShowAccounts accountType="expense" />*/}
        {/*
        <TableShowExpenses />
        <TableShowIncomes />
        */}
      </div>
    </main>
  );
}
