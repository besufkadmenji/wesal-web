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

  /** Leaves the app for the gateway's hosted checkout page. */
  static redirect(url: string) {
    window.location.assign(url);
  }
}
