"use client";

import type { ContractPaginationInput } from "@/gql/graphql";
import { queryKeys } from "@/hooks/queryKeys";
import { ContractService } from "@/services/contract.service";
import { useQuery } from "@tanstack/react-query";

export const useContracts = (
  input: ContractPaginationInput = {},
  enabled = true,
) =>
  useQuery({
    queryKey: [...queryKeys.contracts, input],
    queryFn: () => ContractService.findAll({ page: 1, limit: 30, ...input }),
    enabled,
  });

/** S4-19: refreshed every minute and by contract notifications. */
export const useOverdueContracts = (enabled: boolean) =>
  useQuery({
    queryKey: [...queryKeys.contracts, "overdue"],
    queryFn: () => ContractService.overdue(),
    enabled,
    refetchInterval: 60_000,
    refetchOnWindowFocus: true,
  });

/** S4-12: paid contracts the provider still has to be told about. */
export const usePaidContractNotices = (enabled: boolean) =>
  useQuery({
    queryKey: [...queryKeys.contracts, "paid-notices"],
    queryFn: () => ContractService.paidNotices(),
    enabled,
    refetchInterval: 60_000,
    refetchOnWindowFocus: true,
  });

export const useContract = (id?: string) =>
  useQuery({
    queryKey: queryKeys.contract(id || ""),
    queryFn: () => ContractService.findOne(id!),
    enabled: Boolean(id),
  });
