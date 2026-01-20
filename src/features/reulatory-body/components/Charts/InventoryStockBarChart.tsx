
import ReactECharts from "echarts-for-react";

export default function InventoryStockBarChart() {
  const option = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      top: "3%",
      containLabel: true,
    },
    xAxis: [
      {
        type: "category",
        data: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ],
        axisTick: {
          alignWithLabel: true,
        },
      },
    ],
    yAxis: [
      {
        type: "value",
      },
    ],
    series: [
      {
        name: "Stock",
        type: "bar",
        barWidth: "60%",
        data: [120, 400, 900, 250, 600, 500, 550, 250, 180, 400, 800, 100],
        itemStyle: {
          color: "#7e22ce", // Purple-ish matching image
        },
      },
    ],
  };

  return (
    <ReactECharts option={option} style={{ height: "300px", width: "100%" }} />
  );
}
