"use client";

import { PaymentStatus } from "@/gql/graphql";
import { PaymentService } from "@/services/payment.service";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const POLL_MS = 2_000;
const GIVE_UP_MS = 30_000;

/**
 * The gateway's webhook can land just after the customer is redirected back,
 * so a pending payment is polled for a short while before giving up.
 */
export const usePaymentResult = (paymentId: string | null) => {
  const [timedOut, setTimedOut] = useState(false);
  const query = useQuery({
    queryKey: ["payment-result", paymentId],
    queryFn: () => PaymentService.result(paymentId!),
    enabled: Boolean(paymentId),
    retry: false,
    refetchInterval: (current) =>
      !timedOut && current.state.data?.status === PaymentStatus.Pending
        ? POLL_MS
        : false,
  });

  useEffect(() => {
    const timer = setTimeout(() => setTimedOut(true), GIVE_UP_MS);
    return () => clearTimeout(timer);
  }, []);

  return { ...query, timedOut };
};
