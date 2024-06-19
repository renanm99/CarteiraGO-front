import { Sidepanel } from "./sidepanel";
import { PieChart } from "./ApexChart";
import { DateRangePicker } from "./dateRange";

export function DashboardPage() {
  return (
    <main className="">
      <div className="z-50 fixed flex">
        <div className="">
          <Sidepanel />
        </div>
      </div>

      <div className="flex w-full flex-col md:flex-row items-center justify-center translate-x-0 p-5">
        <div className="flex flex-col">
          <div className="translate-x-4 w-1/4 md:w-1/6 bg-white rounded-lg shadow dark:bg-gray-800 p-2 md:p-3">
            <DateRangePicker />
          </div>
          <div className="flex flex-col md:flex-row">
            <div className="p-4">
              <PieChart accountType="expenses" />
            </div>
            <div className="p-4">
              <PieChart accountType="incomes" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
