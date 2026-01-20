import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";
// @ts-ignore
import NGGeo from "@/components/json/NGGeo.json";

export default function BloodInventoryMap() {
  // Register the map using the imported JSON
  echarts.registerMap("Nigeria", NGGeo as any);

  const option = {
    tooltip: {
      trigger: "item",
      showDelay: 0,
      transitionDuration: 0.2,
    },
    visualMap: {
      left: "right",
      min: 0,
      max: 100,
      inRange: {
        color: ["#e0ffff", "#006edd"],
      },
      text: ["High", "Low"], // text range
      calculable: true,
      show: false, // Hide based on design, design uses custom legend
    },
    series: [
      {
        name: "Blood Inventory",
        type: "map",
        roam: true,
        map: "Nigeria", // Must match the registered name
        emphasis: {
          label: {
            show: true,
          },
        },
        // Mock data to color some regions
        data: [
          { name: "Lagos", value: 90 },
          { name: "Abuja", value: 80 },
          { name: "Kano", value: 50 },
          { name: "Rivers", value: 70 },
          // Add more states as needed
        ],
        itemStyle: {
          areaColor: "#f3f4f6",
          borderColor: "#ddd",
        },
      },
    ],
  };

  return (
    <ReactECharts option={option} style={{ height: "350px", width: "100%" }} />
  );
}
