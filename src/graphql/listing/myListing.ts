import { MyListingQuery, MyListingQueryVariables } from "@/gql/graphql";
import { gql, TypedDocumentNode } from "@apollo/client";

/** The owner's view of one ad, whatever its status (S4-59: expired too). */
export const MY_LISTING_QUERY: TypedDocumentNode<
  MyListingQuery,
  MyListingQueryVariables
> = gql`
  query MyListing($id: ID!) {
    myListing(id: $id) {
      id
      categoryId
      cityId
      createdAt
      description
      name
      price
      status
      promotionStatus
      promotionCycle
      featuredStartsAt
      featuredEndsAt
      expiresAt
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
      ratingAverage
      ratingCount
      photos {
        filename
        id
        sortOrder
        type
        originalFilename
        size
      }
      provider {
        ratingAverage
        ratingCount
        isNewlyAdded
        id
        name
        isActive
        emailVerified
        email
        createdAt
        phone
        phoneVerified
        status
        updatedAt
      }
    }
  }
`;
