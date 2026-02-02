import {
  CreateListingMutation,
  CreateListingMutationVariables,
} from "@/gql/graphql";
import { gql, TypedDocumentNode } from "@apollo/client";

export const CREATE_LISTING_MUTATION: TypedDocumentNode<
  CreateListingMutation,
  CreateListingMutationVariables
> = gql`
  mutation createListing($createListingInput: CreateListingInput!) {
    createListing(createListingInput: $createListingInput) {
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
