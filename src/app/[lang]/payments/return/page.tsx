import { PaymentReturnPage } from "@/components/app/payments/PaymentReturnPage";
import { Suspense } from "react";

export default function PaymentReturn() {
  return (
    <Suspense fallback={null}>
      <PaymentReturnPage />
    </Suspense>
  );
}
