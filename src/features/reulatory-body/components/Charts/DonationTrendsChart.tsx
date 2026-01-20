
import ReactECharts from "echarts-for-react";

export default function DonationTrendsChart() {
  const option = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        label: {
          backgroundColor: "#6a7985",
        },
      },
    },
    legend: {
      data: ["Return Donors", "New Donors"],
      bottom: 0,
      icon: "roundRect",
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "10%", // Increased for legend
      top: "3%",
      containLabel: true,
    },
    xAxis: [
      {
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
          color: "#888",
        },
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
      },
    ],
    yAxis: [
      {
        type: "value",
        splitLine: {
          lineStyle: {
            type: "dashed",
          },
        },
      },
    ],
    series: [
      {
        name: "Return Donors",
        type: "line",
        stack: "Total",
        smooth: true,
        lineStyle: {
          width: 0,
        },
        showSymbol: false,
        areaStyle: {
          opacity: 0.8,
          color: "#5B8C7A", // Greenish
        },
        emphasis: {
          focus: "series",
        },
        data: [140, 232, 101, 264, 90, 340, 250, 180, 290, 150, 360, 220],
      },
      {
        name: "New Donors",
        type: "line",
        stack: "Total",
        smooth: true,
        lineStyle: {
          width: 0,
        },
        showSymbol: false,
        areaStyle: {
          opacity: 0.8,
          color: "#9CD9C6", // Lighter Green
        },
        emphasis: {
          focus: "series",
        },
        data: [120, 282, 111, 234, 220, 340, 310, 250, 190, 230, 210, 290],
      },
    ],
  };

  return (
    <ReactECharts option={option} style={{ height: "300px", width: "100%" }} />
  );
}
