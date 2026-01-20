
import ReactECharts from "echarts-for-react";

export default function DemandSupplyLineChart() {
  const option = {
    tooltip: {
      trigger: "axis",
    },
    legend: {
      bottom: 0,
      icon: "roundRect",
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
        "Abua-\nOdual",
        "Ahoada-\nEast",
        "Ahoada-\nWest",
        "Akuku-Toru",
        "Andoni",
        "Asari-\nToru",
        "Bonny",
        "Degema",
        "Eleme",
        "Opobo-\nNkoro",
        "Port-\nHarcourt",
        "Tai",
      ],
      axisLabel: {
        interval: 0,
        rotate: 0,
        fontSize: 10,
        lineHeight: 14,
      },
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        name: "Donations",
        type: "line",
        data: [120, 132, 101, 134, 90, 230, 210, 120, 132, 101, 134, 90],
        itemStyle: { color: "#5B8C7A" }, // Green
        lineStyle: { width: 1 },
      },
      {
        name: "Requests",
        type: "line",
        data: [220, 182, 191, 234, 290, 330, 310, 220, 182, 191, 234, 290],
        itemStyle: { color: "#EF4444" }, // Red
        lineStyle: { width: 1 },
      },
      {
        name: "Fulfilled request",
        type: "line",
        data: [150, 232, 201, 154, 190, 330, 410, 150, 232, 201, 154, 190],
        itemStyle: { color: "#3B82F6" }, // Blue
        lineStyle: { width: 1 },
      },
    ],
  };

  return (
    <ReactECharts option={option} style={{ height: "300px", width: "100%" }} />
  );
}
