import { DocumentNode, gql } from "@apollo/client";

export const USER_UPDATED_SUBSCRIPTION: DocumentNode = gql`
  subscription UserUpdated {
    userUpdated {
      id
      status
    }
  }
`;
