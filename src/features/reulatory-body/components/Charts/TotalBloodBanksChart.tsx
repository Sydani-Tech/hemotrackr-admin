import ReactECharts from "echarts-for-react";

export default function TotalBloodBanksChart() {
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
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: [
      {
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
          "Emohua",
          "Etche",
          "Omuma",
          "Opobo-\nNkoro",
          "Port-\nHarcourt",
          "Tai",
        ],
        axisLabel: {
          interval: 0,
          fontSize: 10,
          color: "#6b7280",
        },
        axisLine: {
          lineStyle: {
            color: "#e5e7eb",
          },
        },
        axisTick: {
          show: true,
          alignWithLabel: true,
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
        name: "Total Blood Banks",
        type: "line",
        stack: "Total",
        smooth: false,
        lineStyle: {
          width: 0,
        },
        showSymbol: true,
        symbol: "circle",
        symbolSize: 6,
        itemStyle: {
          color: "#7e9c9d",
        },
        areaStyle: {
          opacity: 0.8,
          color: "#7e9c9d", // Slate Blueish color from image
        },
        emphasis: {
          focus: "series",
        },
        data: [8, 13, 10, 19, 18, 12, 6, 13, 6, 8, 20, 5, 8, 8, 7, 11],
      },
    ],
  };

  return (
    <ReactECharts option={option} style={{ height: "350px", width: "100%" }} />
  );
}
