import {
  UpdateListingMutation,
  UpdateListingMutationVariables,
} from "@/gql/graphql";
import { gql, TypedDocumentNode } from "@apollo/client";

export const UPDATE_LISTING_MUTATION: TypedDocumentNode<
  UpdateListingMutation,
  UpdateListingMutationVariables
> = gql`
  mutation updateListing($updateListingInput: UpdateListingInput!) {
    updateListing(updateListingInput: $updateListingInput) {
      categoryId
      cityId
      createdAt
      description
      id
      name
      price
      status
      story {
        filename
        id
        sortOrder
        type
        originalFilename
        size
      }
      tags
      type
      updatedAt
      providerId
      photos {
        filename
        id
        sortOrder
        type
        originalFilename
        size
      }
    }
  }
`;
