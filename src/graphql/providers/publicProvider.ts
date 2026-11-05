import { gql } from "@apollo/client";

/** Public provider page (ClickUp 869fnvz70): profile, address and counts. */
export const PUBLIC_PROVIDER_QUERY = gql`
  query publicProvider($id: ID!) {
    provider(id: $id) {
      id
      name
      commercialName
      avatarFilename
      address
      ratingAverage
      ratingCount
      isNewlyAdded
      listingsCount
      contractsCount
    }
  }
`;
