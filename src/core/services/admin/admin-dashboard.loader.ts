import { queryClient } from "../../../lib/queryClient";
import { AdminAPI } from "../AdminService";

export const adminDashboardLoader = async () => {
  return queryClient.fetchQuery({
    queryKey: ["adminStats"],
    queryFn: AdminAPI.getDashboardStats,
  });
};
