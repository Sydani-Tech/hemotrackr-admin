
import ReactECharts from "echarts-for-react";
import { ArrowUp, ArrowDown, User,  Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

// --- Components ---

const StatCard = ({
  title,
  value,
  trend,
  trendUp,
  color = "bg-white",
  icon: Icon,
}: {
  title: string;
  value: string;
  trend: string;
  trendUp: boolean;
  color?: string;
  icon?: any;
}) => (
  <div className={`p-6 rounded-2xl ${color} shadow-sm border border-gray-100`}>
    <div className="flex justify-between items-start mb-4">
      <div>
        <p className="text-gray-500 text-xs font-medium uppercase tracking-wider mb-1">
          {title}
        </p>
        <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
      </div>
      {Icon && (
        <div className="p-2 bg-yellow-100 rounded-full">
          <Icon className="w-5 h-5 text-yellow-600" />
        </div>
      )}
    </div>
    <div className="flex items-center gap-2">
      <span
        className={`flex items-center text-xs font-bold ${
          trendUp ? "text-green-500" : "text-red-500"
        }`}
      >
        {trendUp ? (
          <ArrowUp className="w-3 h-3 mr-1" />
        ) : (
          <ArrowDown className="w-3 h-3 mr-1" />
        )}
        {trend}
      </span>
    </div>
  </div>
);

const ChartCard = ({ title, children, action }: any) => (
  <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
    <div className="flex items-center justify-between mb-6">
      <h3 className="font-bold text-gray-800 text-sm uppercase tracking-wide">
        {title}
      </h3>
      {action}
    </div>
    {children}
  </div>
);

const ListItem = ({ title, subtitle, rightAction }: any) => (
  <div className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0 hover:bg-gray-50 px-2 rounded-lg transition-colors">
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
        <User className="w-4 h-4" />
      </div>
      <div>
        <h4 className="text-sm font-semibold text-gray-900">{title}</h4>
        <p className="text-xs text-gray-500">{subtitle}</p>
      </div>
    </div>
    {rightAction}
  </div>
);

const AdminHome = () => {
  // Chart Options
  const barOption = {
    grid: { top: 20, right: 20, bottom: 20, left: 40, containLabel: true },
    xAxis: {
      type: "category",
      data: [
        "South-East",
        "South-West",
        "North-Central",
        "North-East",
        "North-West",
      ],
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: "#9ca3af", fontSize: 10 },
    },
    yAxis: {
      type: "value",
      splitLine: { lineStyle: { type: "dashed", color: "#f3f4f6" } },
    },
    series: [
      {
        data: [120, 200, 150, 80, 70],
        type: "bar",
        barWidth: "40%",
        itemStyle: { borderRadius: [4, 4, 0, 0] },
        color: "#6366f1",
      },
    ],
  };

  const pieOption = {
    tooltip: { trigger: "item" },
    legend: { bottom: "0%", left: "center", icon: "circle" },
    series: [
      {
        type: "pie",
        radius: ["40%", "70%"],
        avoidLabelOverlap: false,
        itemStyle: { borderRadius: 10, borderColor: "#fff", borderWidth: 2 },
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
        labelLine: { show: false },
        data: [
          { value: 1048, name: "A+" },
          { value: 735, name: "B+" },
          { value: 580, name: "O+" },
          { value: 484, name: "AB+" },
        ],
      },
    ],
  };

  const lineOption = {
    grid: { top: 10, right: 10, bottom: 20, left: 0, containLabel: true },
    xAxis: {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      axisLine: { show: false },
      axisTick: { show: false },
    },
    yAxis: {
      type: "value",
      splitLine: { show: false },
      axisLabel: { show: false },
    },
    series: [
      {
        data: [150, 230, 224, 218, 135, 147, 260],
        type: "line",
        smooth: true,
        areaStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: "rgba(239, 68, 68, 0.5)", // color at 0%
              },
              {
                offset: 1,
                color: "rgba(239, 68, 68, 0)", // color at 100%
              },
            ],
            global: false, // default is false
          },
        },
        lineStyle: { color: "#ef4444", width: 3 },
        showSymbol: false,
      },
    ],
  };

  return (
    <div className="space-y-6 pb-12">
      {/* 1. Top Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard
          title="Total Active Donor"
          value="3,032"
          trend="1.5%"
          trendUp={true}
          color="bg-[#FFD600]"
          icon={User}
        />
        <StatCard
          title="Total Amount of Subscriptions"
          value="$ 2,253,453"
          trend="4%"
          trendUp={true}
        />
        <StatCard
          title="Total Number of Facilities"
          value="3,032"
          trend="1.5%"
          trendUp={true}
        />
        <StatCard
          title="Total Number of Users"
          value="15,234"
          trend="12%"
          trendUp={true}
        />
      </div>

      {/* 2. Lists Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard
          title="Blood Donors"
          action={
            <Button variant="ghost" className="text-orange-500 h-8 text-xs">
              See all
            </Button>
          }
        >
          <div className="space-y-1">
            {[1, 2, 3].map((i) => (
              <ListItem
                key={i}
                title="Precious Ogar"
                subtitle="Opm • 14 - Sep - 2022, 10:00"
                rightAction={
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-7 text-xs bg-blue-50 text-blue-600 border-blue-100"
                  >
                    View
                  </Button>
                }
              />
            ))}
          </div>
        </ChartCard>

        <ChartCard
          title="Admins"
          action={
            <Button variant="ghost" className="text-orange-500 h-8 text-xs">
              See all
            </Button>
          }
        >
          <div className="space-y-1">
            {[1, 2, 3].map((i) => (
              <ListItem
                key={i}
                title="Admin 1"
                subtitle="Main Branch • Active"
                rightAction={
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-7 text-xs bg-blue-50 text-blue-600 border-blue-100"
                  >
                    View
                  </Button>
                }
              />
            ))}
          </div>
        </ChartCard>
      </div>

      {/* 3. Bar Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard
          title="Persons with High Blood Donor"
          action={
            <Button variant="outline" size="sm" className="h-8 gap-2 text-xs">
              Filter <Filter className="w-3 h-3" />
            </Button>
          }
        >
          <ReactECharts option={barOption} style={{ height: "300px" }} />
        </ChartCard>
        <ChartCard
          title="Blood Supply"
          action={
            <Button variant="outline" size="sm" className="h-8 gap-2 text-xs">
              Jan <ArrowDown className="w-3 h-3" />
            </Button>
          }
        >
          <ReactECharts option={barOption} style={{ height: "300px" }} />
        </ChartCard>
      </div>

      {/* 4. Bar Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Blood Bank In Range">
          <ReactECharts option={barOption} style={{ height: "300px" }} />
        </ChartCard>
        <ChartCard title="Yearly History">
          <ReactECharts option={barOption} style={{ height: "300px" }} />
        </ChartCard>
      </div>

      {/* 5. Lists Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard
          title="Blood Banks"
          action={
            <Button variant="ghost" className="text-orange-500 h-8 text-xs">
              See all
            </Button>
          }
        >
          <div className="space-y-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <ListItem
                key={i}
                title="Medic Hospital"
                subtitle="Opm • 14 - Sep - 2022, 10:00"
                rightAction={
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-7 text-xs bg-blue-50 text-blue-600 border-blue-100"
                  >
                    View Details
                  </Button>
                }
              />
            ))}
          </div>
        </ChartCard>

        <ChartCard
          title="Most Active Banks"
          action={
            <Button variant="ghost" className="text-orange-500 h-8 text-xs">
              See all
            </Button>
          }
        >
          <div className="space-y-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <ListItem
                key={i}
                title="City Health Clinic"
                subtitle="200+ Donations • Verified"
                rightAction={
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-7 text-xs bg-blue-50 text-blue-600 border-blue-100"
                  >
                    View Details
                  </Button>
                }
              />
            ))}
          </div>
        </ChartCard>
      </div>

      {/* 6. Pie Charts Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ChartCard title="Blood Types in Bank">
          <ReactECharts option={pieOption} style={{ height: "250px" }} />
        </ChartCard>
        <ChartCard title="Age of Blood Donors">
          <ReactECharts option={pieOption} style={{ height: "250px" }} />
        </ChartCard>
        <ChartCard title="Gender of Blood Donors">
          <ReactECharts option={pieOption} style={{ height: "250px" }} />
        </ChartCard>
      </div>

      {/* 7. Bottom Stats Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ChartCard title="Blood Types">
          <ReactECharts option={pieOption} style={{ height: "200px" }} />
        </ChartCard>
        <div className="lg:col-span-2">
          <ChartCard title="Blood Demand">
            <ReactECharts option={lineOption} style={{ height: "200px" }} />
          </ChartCard>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
