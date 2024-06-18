import { Sidepanel } from "./sidepanel";

export function DashboardPage() {
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
