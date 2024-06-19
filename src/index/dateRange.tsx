import { Sidepanel } from "./sidepanel";
import { PieChart } from "./ApexChart";

export function DateRangePicker() {
  return (
    <div>
      <button
        name="dateRangeButton"
        data-dropdown-toggle="dateRangeDropdown"
        data-dropdown-ignore-click-outside-classname="datepicker"
        type="button"
        className="inline-flex items-center text-blue-700 dark:text-blue-600 font-medium hover:font-bold"
        onClick={() => {
          document
            .getElementById("dateRangeDropdown")
            .classList.toggle("hidden");
        }}
      >
        Month{" "}
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
      <div
        id="dateRangeDropdown"
        className="hidden fixed z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-80 lg:w-96 dark:bg-gray-700 dark:divide-gray-600"
      >
        <div className="p-3" aria-labelledby="dateRangeButton">
          <div
            date-rangepicker="true"
            datepicker-autohide="true"
            className="flex items-center"
          >
            <input
              name="start"
              type="date"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Start date"
            />

            <span className="mx-2 text-gray-500 dark:text-gray-400">to</span>
            <input
              name="end"
              type="date"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="End date"
            />
          </div>
          <button className="pt-2">{"> Select date"}</button>
        </div>
      </div>
    </div>
  );
}
