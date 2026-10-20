import { gql } from "@apollo/client";

export const START_PAYMENT_CHECKOUT_MUTATION = gql`
  mutation StartPaymentCheckout($input: StartPaymentCheckoutInput!) {
    startPaymentCheckout(input: $input) {
      paymentId
      redirectUrl
    }
  }
`;

export const PAYMENT_RESULT_QUERY = gql`
  query PaymentResult($id: String!) {
    payment(id: $id) {
      id
      purpose
      status
      amount
      paymentMethod
      contractId
      conversationId
      listingId
      paidAt
      failedAt
    }
  }
`;
