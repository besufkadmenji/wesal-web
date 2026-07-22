"use client";

import type { ContractPaginationInput } from "@/gql/graphql";
import { queryKeys } from "@/hooks/queryKeys";
import { ContractService } from "@/services/contract.service";
import { useQuery } from "@tanstack/react-query";

export const useContracts = (input: ContractPaginationInput = {}) =>
  useQuery({
    queryKey: [...queryKeys.contracts, input],
    queryFn: () => ContractService.findAll({ page: 1, limit: 30, ...input }),
  });

export const useContract = (id?: string) =>
  useQuery({
    queryKey: queryKeys.contract(id || ""),
    queryFn: () => ContractService.findOne(id!),
    enabled: Boolean(id),
  });
