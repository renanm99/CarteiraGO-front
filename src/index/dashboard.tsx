import { Sidepanel } from "./sidepanel";
import { PieChart } from "./PieChart";
import { useEffect, useState } from "react";
import { Datepicker } from "flowbite-react";
import { chartOptions } from "./model/chartOptions";
import { Account } from "./model/account";

interface Dashboard {
  Category: string;
  Value: number;
  Datetime: Date;
  Type: string;
}

export function DashboardPage() {
  const [dateStart, setDateStart] = useState(
    new Date(new Date().setMonth(new Date().getMonth() - 1))
  );
  const [dateEnd, setDateEnd] = useState(new Date());
  const [chartItensExpenses, setItensExpenses] = useState<Dashboard[]>([]);
  const [chartItensIncomes, setItensIncomes] = useState<Dashboard[]>([]);

  useEffect(() => {
    if ((chartItensExpenses.length === 0) & (chartItensIncomes.length === 0)) {
      async function fetchData() {
        const expenses = await new Account("expenses").getDashboard();
        setItensExpenses(expenses);
        const incomes = await new Account("incomes").getDashboard();
        setItensIncomes(incomes);
      }
      fetchData();
    }
  }, [chartItensExpenses, chartItensIncomes]);

  /*
  function updateChartsByDate(dstart: Date, dend: Date) {
    
    //console.log(document.getElementById("pie-chart-expenses"));
    
    const chartExpenses = new ApexCharts(
      document.getElementById("pie-chart-expenses"),
      document.getElementById("pie-chart-expenses").options
    );
    chartExpenses.render();
    
  }
  */
  /*
  useEffect(() => {
    async function fetchData() {
      if (chartItensExpenses.length > 0) {
        const expenses = await new Account("expenses").getDashboard();
        setItensExpenses(expenses);
        const incomes = await new Account("incomes").getDashboard();
        setItensIncomes(incomes);
      }
    }
    fetchData();
  }, [dateStart, dateEnd]);
*/
  return (
    <main className="flex">
      <div className="z-50 fixed flex">
        <div className="">
          <Sidepanel />
        </div>
      </div>
      <div className="w-full md:block translate-x-0 -translate-y-2 lg:translate-x-40 p-4">
        <div
          name="datePickerRange"
          className="fixed z-50 translate-x-5 flex flex-col w-72 h-11 bg-white rounded-lg shadow dark:bg-gray-800 mt-2 p-2"
        >
          <div
            className="inline-flex items-center text-blue-700 dark:text-blue-600 font-medium hover:font-bold cursor-pointer"
            onClick={() => {
              document
                .getElementById("dateRangeDropdown")
                .classList.toggle("invisible");
            }}
          >
            <svg
              className="w-6 h-6 mr-4 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.2"
                d="M5 1v3m5-3v3m5-3v3M1 7h18M5 11h10M2 3h16a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z"
              />
            </svg>
            {dateStart.toDateString().substring(4)} {" to "}
            {dateEnd.toDateString().substring(4)}
            <button
              name="dateRangeButton"
              type="button"
              className="inline-flex items-center text-blue-700 dark:text-blue-600 font-medium hover:font-bold"
            >
              <svg
                className="w-3 h-3 ms-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>
          </div>
          <div
            id="dateRangeDropdown"
            className="invisible flex flex-row w-full translate-y-5"
          >
            <Datepicker
              id="clock1"
              width={10}
              height={10}
              icon={""}
              maxDate={new Date()}
              defaultDate={
                new Date(new Date().setMonth(new Date().getMonth() - 1))
              }
              onSelectedDateChanged={(e) => {
                const date1 = new Date(e);
                const date2 = new Date(document.getElementById("clock2").value);
                if (date1 < date2) {
                  setDateStart(e);
                }
              }}
            />
            <Datepicker
              id="clock2"
              icon={""}
              maxDate={new Date()}
              onSelectedDateChanged={(e) => {
                const date1 = new Date(document.getElementById("clock1").value);
                const date2 = new Date(e);
                if (date1 < date2) {
                  setDateEnd(new Date(e.setDate(e.getDate() + 1)));
                }
              }}
            />
          </div>
        </div>
        <div
          id="teste-account"
          className="flex flex-col items-center justify-center md:flex-row p-4 translate-y-10 lg:-translate-x-28 xl:-translate-x-11/12 2xl:-translate-x-80 w-full h-full"
        >
          <PieChart
            ChartItens={chartItensExpenses}
            Options={new chartOptions()}
            DateStart={dateStart}
            DateEnd={dateEnd}
            accountType="expenses"
          />
          <PieChart
            ChartItens={chartItensIncomes}
            Options={new chartOptions()}
            DateStart={dateStart}
            DateEnd={dateEnd}
            accountType="incomes"
          />
        </div>
      </div>
    </main>
  );
}
