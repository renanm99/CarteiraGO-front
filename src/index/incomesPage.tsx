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
      <div className="md:block translate-x-0 lg:translate-x-40 h-full w-11/12 md:w-full lg:w-10/12">
        {/*<TableShowAccounts accountType="expense" />*/}
        <TableShowAccounts accountType="incomes" />
        {/*
        <TableShowExpenses />
        <TableShowIncomes />
        */}
      </div>
    </main>
  );
}
