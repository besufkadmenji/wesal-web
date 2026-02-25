import { DocumentNode, gql } from "@apollo/client";

export const PROVIDER_UPDATED_SUBSCRIPTION: DocumentNode = gql`
  subscription ProviderUpdated {
    providerUpdated {
      id
      status
    }
  }
`;
