import { SignContractInput, UpdateUserInput, User } from "@/gql/graphql";
import { ME_QUERY } from "@/graphql/user/me";
import { REMOVE_AVATAR_MUTATION } from "@/graphql/user/removeAvatar";
import { SIGN_CONTRACT_MUTATION } from "@/graphql/user/signContract";
import { TERMINATE_CONTRACT_MUTATION } from "@/graphql/user/terminateContract";
import { UPDATE_USER_MUTATION } from "@/graphql/user/updateUser";
import client from "@/utils/apollo.client";
import { parseGraphQLError } from "@/utils/parse-graphql-error";

class UserService {
  static me = async (): Promise<User | null> => {
    try {
      const userResult = await client().query({
        query: ME_QUERY,
      });
      return userResult.data?.me ?? null;
    } catch (e) {
      console.error("userResult", e);
    }
    return null;
  };

  static updateUser = async (input: UpdateUserInput) => {
    try {
      const removeAvatarResponse = await client().mutate({
        mutation: UPDATE_USER_MUTATION,
        variables: {
          updateUserInput: input,
        },
      });
      return removeAvatarResponse.data?.updateUser ?? null;
    } catch (error) {
      // Parse and throw the error with a readable message
      const errorMessage = parseGraphQLError(error);
      throw new Error(errorMessage);
    }
  };
  static removeAvatar = async (removeAvatarId: string) => {
    try {
      const removeAvatarResponse = await client().mutate({
        mutation: REMOVE_AVATAR_MUTATION,
        variables: {
          removeAvatarId,
        },
      });
      return removeAvatarResponse.data?.removeAvatar ?? null;
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
      return removeAvatarResponse.data?.signContract ?? null;
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
      return removeAvatarResponse.data?.terminateContract ?? null;
    } catch (error) {
      // Parse and throw the error with a readable message
      const errorMessage = parseGraphQLError(error);
      throw new Error(errorMessage);
    }
  };
}

export default UserService;
