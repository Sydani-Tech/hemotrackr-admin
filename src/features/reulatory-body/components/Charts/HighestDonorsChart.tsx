
import ReactECharts from "echarts-for-react";

export default function HighestDonorsChart() {
  const option = {
    tooltip: {
      trigger: "axis",
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "15%",
      top: "5%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
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
      axisLabel: {
        rotate: 45,
      },
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        name: "Donors",
        type: "line",
        smooth: false, // Image shows sharp lines
        symbol: "circle",
        symbolSize: 6,
        data: [820, 232, 901, 334, 590, 830, 320, 432, 401, 934, 1290, 1330],
        areaStyle: {
          color: "#84ccba", // Light greenish gray
        },
        itemStyle: {
          color: "#65a394",
        },
        lineStyle: {
          color: "#65a394",
        },
      },
    ],
  };

  return (
    <ReactECharts option={option} style={{ height: "250px", width: "100%" }} />
  );
}
