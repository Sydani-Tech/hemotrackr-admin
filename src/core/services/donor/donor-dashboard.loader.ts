import { queryClient } from "../../../lib/queryClient";
import { DonorAPI } from "../DonorService";

export const donorDashboardLoader = async () => {
  return queryClient.fetchQuery({
    queryKey: ["donorStats"],
    queryFn: DonorAPI.getDashboardStats,
  });
};
