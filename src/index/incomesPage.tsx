import { Sidepanel } from "./sidepanel";
import { TableShowAccounts } from "./tableAccounts";

export function IncomesPage() {
  return (
    <main className="">
      <div className="z-50 fixed md:flex">
        <div className="">
          <Sidepanel />
        </div>
      </div>
      <div className="md:block translate-x-0 md:translate-x-40 h-full md:w-10/12">
        {/*<TableShowAccounts accountType="expense" />*/}
        <TableShowAccounts accountType="income" />
        {/*
        <TableShowExpenses />
        <TableShowIncomes />
        */}
      </div>
    </main>
  );
}
