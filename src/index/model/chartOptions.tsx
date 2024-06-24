import { Account } from "./account";

export class chartOptions {
  series: never[] = [];
  colors: never[] = [];
  chart: object = {
    height: 420,
    width: "100%",
    type: "pie",
  };
  stroke: object = {
    colors: ["white"],
    lineCap: "",
  };
  noData: object = {
    text: "Loading...",
  };
  plotOptions: object = {
    pie: {
      labels: {
        show: true,
      },
      size: "100%",
      dataLabels: {
        offset: -25,
      },
    },
  };
  labels: never[] = [];
  dataLabels: object = {
    enabled: true,
    style: {
      fontFamily: "Inter, sans-serif",
    },
  };
  legend: object = {
    position: "bottom",
    fontFamily: "Inter, sans-serif",
  };
  yaxis: object = {
    labels: {
      formatter: (value) => {
        return "R$" + value;
      },
    },
  };
  xaxis: object = {
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
  };

  async getDashboard(accountType: string) {
    const response = await new Account(accountType).getDashboard();
    return response;
  }
}
