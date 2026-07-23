"use client";

import type { ComplaintPaginationInput } from "@/gql/graphql";
import { queryKeys } from "@/hooks/queryKeys";
import { ComplaintService } from "@/services/complaint.service";
import { useQuery, type Query } from "@tanstack/react-query";

type ComplaintsQueryData = Awaited<ReturnType<typeof ComplaintService.findAll>>;

type UseComplaintsOptions = {
  enabled?: boolean;
  refetchInterval?:
    | number
    | false
    | ((query: Query<ComplaintsQueryData, Error>) => number | false | undefined);
};

export const useComplaints = (
  input: ComplaintPaginationInput = {},
  options: UseComplaintsOptions = {},
) =>
  useQuery({
    queryKey: [...queryKeys.complaints, input],
    queryFn: () => ComplaintService.findAll({ page: 1, limit: 20, ...input }),
    enabled: options.enabled ?? true,
    refetchInterval: options.refetchInterval,
    refetchIntervalInBackground: false,
  });

export const useComplaint = (id?: string) =>
  useQuery({
    queryKey: queryKeys.complaint(id || ""),
    queryFn: () => ComplaintService.findOne(id!),
    enabled: Boolean(id),
    refetchInterval: 15_000,
    refetchIntervalInBackground: false,
  });
