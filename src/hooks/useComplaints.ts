"use client";

import type { ComplaintPaginationInput } from "@/gql/graphql";
import { queryKeys } from "@/hooks/queryKeys";
import { ComplaintService } from "@/services/complaint.service";
import { useQuery } from "@tanstack/react-query";

export const useComplaints = (input: ComplaintPaginationInput = {}) =>
  useQuery({
    queryKey: [...queryKeys.complaints, input],
    queryFn: () => ComplaintService.findAll({ page: 1, limit: 20, ...input }),
  });

export const useComplaint = (id?: string) =>
  useQuery({
    queryKey: queryKeys.complaint(id || ""),
    queryFn: () => ComplaintService.findOne(id!),
    enabled: Boolean(id),
    refetchInterval: 15_000,
    refetchIntervalInBackground: false,
  });
