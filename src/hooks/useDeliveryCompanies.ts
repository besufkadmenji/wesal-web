"use client";

import { queryKeys } from "@/hooks/queryKeys";
import { DeliveryCompanyService } from "@/services/delivery.company.service";
import { useQuery } from "@tanstack/react-query";

export const useActiveDeliveryCompanies = () =>
  useQuery({
    queryKey: queryKeys.deliveryCompanies,
    queryFn: () => DeliveryCompanyService.findActive(),
    staleTime: 5 * 60_000,
  });
