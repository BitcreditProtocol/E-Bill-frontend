import { useQuery } from "@tanstack/react-query";
import { getActiveIdentity, getIdentityDetails } from "@/services/identity_v2";
import { getCompanyDetails } from "@/services/company";

export const useActiveIdentity = () => {
  const { data: activeIdentity, isLoading: isLoadingActiveIdentity } = useQuery(
    {
      queryKey: ["identity", "active"],
      queryFn: getActiveIdentity,
    }
  );

  const { data: personalIdentity, isLoading: isLoadingPersonalIdentity } =
    useQuery({
      queryKey: ["identity", "personal"],
      queryFn: getIdentityDetails,
      enabled: !!activeIdentity,
    });

  const isCompany =
    activeIdentity &&
    personalIdentity &&
    activeIdentity.node_id !== personalIdentity.node_id;
  const companyNodeId = isCompany ? activeIdentity.node_id : null;

  const { data: companyIdentity, isLoading: isLoadingCompanyIdentity } =
    useQuery({
      queryKey: ["company", companyNodeId],
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      queryFn: () => getCompanyDetails(companyNodeId!),
      enabled: !!companyNodeId,
    });

  const { data: identityDetails, isLoading: isLoadingDetails } = useQuery({
    queryKey: isCompany ? ["company", companyNodeId] : ["identity", "personal"],
    queryFn: async () => {
      if (isCompany) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return await getCompanyDetails(companyNodeId!);
      } else {
        return await getIdentityDetails();
      }
    },
    enabled: !!(companyNodeId || personalIdentity),
  });

  return {
    type: isCompany ? "company" : "personal",
    activeIdentity,
    personalIdentity,
    companyIdentity,
    identityDetails,
    isLoading:
      isLoadingActiveIdentity ||
      isLoadingPersonalIdentity ||
      isLoadingCompanyIdentity ||
      isLoadingDetails,
  };
};
