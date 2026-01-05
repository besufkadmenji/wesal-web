import { User, LoginInput, UpdateUserInput } from "@/gql/graphql";
import { ME_QUERY } from "@/graphql/user/me";
import client from "@/utils/apollo.client";
import { LOGIN_MUTATION } from "@/graphql/auth/login";
import { parseGraphQLError } from "@/utils/parse-graphql-error";
import { REMOVE_AVATAR_MUTATION } from "@/graphql/user/removeAvatar";
import { UPDATE_USER_MUTATION } from "@/graphql/user/updateUser";

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
}

export default UserService;
