import ApexCharts from "apexcharts";
import { useEffect, useState } from "react";
import { Account } from "./model/account";
import "react-datepicker/dist/react-datepicker.min.css";

export function PieChart({ accountType }: { accountType: string }) {
  const [valueTotal, setValueTotal] = useState(0);
  const options = {
    series: [],
    colors: [],
    chart: {
      height: 420,
      width: "100%",
      type: "pie",
    },
    stroke: {
      colors: ["white"],
      lineCap: "",
    },
    plotOptions: {
      pie: {
        labels: {
          show: true,
        },
        size: "100%",
        dataLabels: {
          offset: -25,
        },
      },
    },
    labels: [],
    dataLabels: {
      enabled: true,
      style: {
        fontFamily: "Inter, sans-serif",
      },
    },
    legend: {
      position: "bottom",
      fontFamily: "Inter, sans-serif",
    },
    yaxis: {
      labels: {
        formatter: function (value) {
          return "R$" + value;
        },
      },
    },
    xaxis: {
      labels: {
        formatter: function (value) {
          return value + "%";
        },
      },
      axisTicks: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
    },
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const account = new Account(accountType);
        let total = 0;
        if (
          document.getElementById("pie-chart-" + accountType) &&
          typeof ApexCharts !== "undefined"
        ) {
          const response = await account.getDashboard();
          response.map((data) => {
            options.labels.push(data.Category);
            options.series.push(data.Value);
            total += data.Value;
          });
          setValueTotal(total);
          const getChartOptions = () => options;
          const chart = new ApexCharts(
            document.getElementById("pie-chart-" + accountType),
            getChartOptions()
          );
          chart.render();
        }
      } catch (err) {
        console.log("errrrr:" + err);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="max-w-sm w-full bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6">
      <div className="flex justify-between items-start w-full">
        <div className="flex-col items-center">
          <div className="flex items-center mb-1">
            <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white me-1">
              {accountType.charAt(0).toUpperCase() + accountType.slice(1)}
            </h5>
          </div>
        </div>
      </div>
      {/* Line Chart */}
      <div className="py-6" id={"pie-chart-" + accountType}></div>
      <h4 className="text-md font-medium leading-none text-gray-900 dark:text-white me-1">
        Total R${valueTotal}
      </h4>
    </div>
  );
}
