import ReactECharts from "echarts-for-react";

export default function ComplianceRequestDonutChart() {
  const option = {
    tooltip: {
      trigger: "item",
    },
    series: [
      {
        name: "Compliance Requests",
        type: "pie",
        radius: ["60%", "80%"],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: "center",
        },
        emphasis: {
          label: {
            show: false,
            fontSize: 40,
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: 10, name: "Approved", itemStyle: { color: "#166534" } }, // Green (using darker green)
          { value: 6, name: "Pending", itemStyle: { color: "#EAB308" } }, // Yellow
          { value: 3, name: "Rejected", itemStyle: { color: "#DC2626" } }, // Red
        ],
      },
    ],
  };

  return (
    <ReactECharts option={option} style={{ height: "120px", width: "120px" }} />
  );
}
