import type {
  Payment,
  PaymentCheckout,
  StartPaymentCheckoutInput,
} from "@/gql/graphql";
import {
  PAYMENT_RESULT_QUERY,
  START_PAYMENT_CHECKOUT_MUTATION,
} from "@/graphql/payment/operations";
import { requireData, requireOperationField } from "@/utils/apollo.result";
import client from "@/utils/apollo.client";

export class PaymentService {
  /** S4-10: opens a gateway checkout; the caller redirects to the URL. */
  static async startCheckout(input: StartPaymentCheckoutInput) {
    const result = await client().mutate<{
      startPaymentCheckout: PaymentCheckout;
    }>({
      mutation: START_PAYMENT_CHECKOUT_MUTATION,
      variables: { input },
    });
    return requireOperationField(
      result,
      "startPaymentCheckout",
      "Start payment",
    );
  }

  /** Fresh from the server: the return page polls it until it settles. */
  static async result(id: string) {
    const result = await client().query<{ payment: Payment }>({
      query: PAYMENT_RESULT_QUERY,
      variables: { id },
      fetchPolicy: "network-only",
    });
    return requireData(result, "Payment").payment;
  }

  /**
   * Leaves the app for the gateway's hosted checkout page. A checkout the
   * mock already settled goes straight to our own return page, on this
   * origin whatever host the API built the URL with.
   */
  static redirect({
    redirectUrl,
    completed,
  }: Pick<PaymentCheckout, "redirectUrl" | "completed">) {
    if (completed) {
      const target = new URL(redirectUrl, window.location.origin);
      // A full load, as after a real gateway, so no stale cache shows.
      // eslint-disable-next-line @next/next/no-location-assign-relative-destination
      window.location.assign(`${target.pathname}${target.search}`);
      return;
    }
    window.location.assign(redirectUrl);
  }
}
