import {
  FeatureListingMutation,
  FeatureListingMutationVariables,
} from "@/gql/graphql";
import { gql, TypedDocumentNode } from "@apollo/client";

/** S4-PAY-REFEATURE: ask to feature an active free ad, then pay. */
export const FEATURE_LISTING_MUTATION: TypedDocumentNode<
  FeatureListingMutation,
  FeatureListingMutationVariables
> = gql`
  mutation featureListing($id: ID!) {
    featureListing(id: $id) {
      id
      status
      type
      promotionStatus
      expiresAt
    }
  }
`;
