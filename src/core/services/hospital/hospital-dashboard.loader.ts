import { queryClient } from "../../../lib/queryClient";
import { HospitalAPI } from "../HospitalService";

export const hospitalDashboardLoader = async () => {
  return queryClient.fetchQuery({
    queryKey: ["hospitalStats"],
    queryFn: HospitalAPI.getDashboard,
  });
};
