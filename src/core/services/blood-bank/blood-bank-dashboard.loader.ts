import { queryClient } from "../../../lib/queryClient";
import { BloodBankAPI } from "../BloodBankService";

export const bloodBankDashboardLoader = async () => {
  return queryClient.fetchQuery({
    queryKey: ["bloodBankStats"],
    queryFn: BloodBankAPI.getDashboardStats,
  });
};
