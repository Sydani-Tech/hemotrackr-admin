
import ReactECharts from "echarts-for-react";

export default function DonorAgePieChart() {
  const option = {
    tooltip: {
      trigger: "item",
    },
    // legend: {
    //   top: "5%",
    //   left: "left",
    //   orient: "vertical",
    //   icon: "circle",
    // },
    series: [
      {
        name: "Donor Ages",
        type: "pie",
        radius: ["50%", "100%"],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: "center",
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 20,
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          {
            value: 1048,
            name: "18 - 25 Years",
            itemStyle: { color: "#FACC15" },
          }, // Yellow
          {
            value: 735,
            name: "26 - 35 Years",
            itemStyle: { color: "#EF4444" },
          }, // Red
          {
            value: 580,
            name: "36 - 45 Years",
            itemStyle: { color: "#10B981" },
          }, // Green
          {
            value: 484,
            name: "46 - 60 Years",
            itemStyle: { color: "#A855F7" },
          }, // Purple
        ],
      },
    ],
  };

  return (
    <ReactECharts option={option} style={{ height: "100%", width: "100%" }} />
  );
}
