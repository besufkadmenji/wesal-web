import { gql } from "@apollo/client";

export const MY_LISTING_QUERY = gql`
  query MyListing($id: ID!) {
    myListing(id: $id) {
      id
      name
      status
      type
      promotionStatus
      promotionCycle
      featuredStartsAt
      featuredEndsAt
    }
  }
`;
