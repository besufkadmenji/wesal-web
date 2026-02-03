import {
  Provider,
  SignContractInput,
  UpdateProviderInput,
} from "@/gql/graphql";
import { ME_PROVIDER_QUERY } from "@/graphql/providers/meProvider";
import { REMOVE_PROVIDER_AVATAR_MUTATION } from "@/graphql/providers/removeProviderAvatar";
import { SIGN_CONTRACT_MUTATION } from "@/graphql/providers/signContract";
import { TERMINATE_CONTRACT_MUTATION } from "@/graphql/providers/terminateContract";
import { UPDATE_PROVIDER_MUTATION } from "@/graphql/providers/updateProvider";
import client from "@/utils/apollo.client";
import { parseGraphQLError } from "@/utils/parse-graphql-error";

class ProviderService {
  static me = async (): Promise<Provider | null> => {
    try {
      const providerResult = await client().query({
        query: ME_PROVIDER_QUERY,
      });
      return providerResult.data?.meProvider ?? null;
    } catch (e) {
      console.error("providerResult", e);
    }
    return null;
  };

  static updateProvider = async (input: UpdateProviderInput) => {
    try {
      const removeAvatarResponse = await client().mutate({
        mutation: UPDATE_PROVIDER_MUTATION,
        variables: {
          updateProviderInput: input,
        },
      });
      return removeAvatarResponse.data?.updateProvider ?? null;
    } catch (error) {
      // Parse and throw the error with a readable message
      const errorMessage = parseGraphQLError(error);
      throw new Error(errorMessage);
    }
  };
  static removeAvatar = async (removeProviderAvatarId: string) => {
    try {
      const removeAvatarResponse = await client().mutate({
        mutation: REMOVE_PROVIDER_AVATAR_MUTATION,
        variables: {
          removeProviderAvatarId,
        },
      });
      return removeAvatarResponse.data?.removeProviderAvatar ?? null;
    } catch (error) {
      // Parse and throw the error with a readable message
      const errorMessage = parseGraphQLError(error);
      throw new Error(errorMessage);
    }
  };
  static signContact = async (input: SignContractInput) => {
    try {
      const removeAvatarResponse = await client().mutate({
        mutation: SIGN_CONTRACT_MUTATION,
        variables: {
          input,
        },
      });
      return removeAvatarResponse.data?.signProviderContract ?? null;
    } catch (error) {
      // Parse and throw the error with a readable message
      const errorMessage = parseGraphQLError(error);
      throw new Error(errorMessage);
    }
  };
  static terminateContact = async (terminationReason: string) => {
    try {
      const removeAvatarResponse = await client().mutate({
        mutation: TERMINATE_CONTRACT_MUTATION,
        variables: {
          terminationReason,
        },
      });
      return removeAvatarResponse.data?.terminateProviderContract ?? null;
    } catch (error) {
      // Parse and throw the error with a readable message
      const errorMessage = parseGraphQLError(error);
      throw new Error(errorMessage);
    }
  };
}

export default ProviderService;
