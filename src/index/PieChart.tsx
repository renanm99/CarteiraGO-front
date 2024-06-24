import ApexCharts from "apexcharts";
import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.min.css";
import { chartOptions } from "./model/chartOptions";

interface Dashboard {
  Category: string;
  Value: number;
  Datetime: Date;
  Type: string;
}

export function PieChart({
  accountType,
  DateStart,
  DateEnd,
  Options,
  ChartItens,
}: {
  accountType: string;
  DateStart: Date;
  DateEnd: Date;
  Options: chartOptions;
  ChartItens: Dashboard[];
}) {
  //const [dateStart] = useState(DateStart);
  //const [dateEnd] = useState(DateEnd);
  const [valueTotal, setValueTotal] = useState(0);
  //const [chartItens, setChartItens] = useState<Dashboard[]>([]);
  const [rendered, setRendered] = useState(false);

  useEffect(() => {
    if (ChartItens.length > 0) {
      let total = 0;
      let totalCategory = 0;

      const labels = [];
      const series = [];

      const opt = Options;
      opt.chart.id = "pie-chart-" + accountType;

      ChartItens.map((data, i) => {
        ChartItens[i].Datetime = new Date(data.Datetime);
        ChartItens[i].Type = accountType;

        if (!(data.Datetime >= DateStart && data.Datetime <= DateEnd))
          return null;

        total += data.Value;

        if (
          ChartItens[i + 1] !== undefined &&
          ChartItens[i + 1].Category === data.Category
        ) {
          totalCategory += data.Value;
        } else {
          totalCategory += data.Value;
          //labels.push(data.Category);
          //series.push(totalCategory);
          opt.labels.push(data.Category);
          opt.series.push(totalCategory);
          totalCategory = 0;
        }
      });

      opt.noData =
        total === 0
          ? { text: "No data in this range" }
          : { text: "Loading..." };

      setValueTotal(total);
      //setChartItens(ChartItens);

      if (!rendered) {
        setRendered(true);
        const chart = new ApexCharts(
          document.getElementById("pie-chart-" + accountType),
          opt
        );
        chart.render();
      } else {
        ApexCharts.exec("pie-chart-" + accountType, "updateOptions", {
          series: opt.series,
          labels: opt.labels,
          noData: opt.noData,
        });
      }
    }
  }, [ChartItens, DateStart, DateEnd]);
  /*
  useEffect(() => {
    console.log(chartItens.length);
    if (chartItens.length > 0) {
      let total = 0;

      const opt = Options;

      chartItens.map((data, i) => {
        chartItens[i].Datetime = new Date(data.Datetime);
        chartItens[i].Type = accountType;
        if (!(data.Datetime >= dateStart && data.Datetime <= dateEnd)) {
          return null;
        }
        total += data.Value;
        opt.labels.push(data.Category);
        opt.series.push(data.Value);
      });
      opt.noData =
        total === 0
          ? { text: "No data in this range" }
          : { text: "Loading..." };

      setValueTotal(total);

      console.log(opt.labels);
      console.log(opt.series);

      const chart = new ApexCharts(
        document.getElementById("pie-chart-" + accountType),
        opt
      );
      chart.render();
    }
  }, [chartItens]);
*/
  return (
    <div
      id={"teste-" + accountType}
      className="max-w-sm w-full bg-white rounded-lg shadow dark:bg-gray-800 p-4 m-1"
    >
      <div className="flex justify-between items-start w-full">
        <div className="flex items-center">
          <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white me-1">
            {accountType.charAt(0).toUpperCase() + accountType.slice(1)}
          </h5>
        </div>
      </div>
      {/* Line Chart */}
      <div className="py-2" id={"pie-chart-" + accountType}></div>
      <h4
        id={"total-" + accountType}
        className="py-4 items-end justify-items-end justify-end text-md font-medium leading-none text-gray-900 dark:text-white me-1"
      >
        Total R${valueTotal}
      </h4>
    </div>
  );
}
