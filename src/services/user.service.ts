import { UpdateMeInput, UpdateUserInput, User } from "@/gql/graphql";
import { ME_USER_QUERY } from "@/graphql/user/meUser";
import { REMOVE_AVATAR_MUTATION } from "@/graphql/user/removeAvatar";
import { UPDATE_USER_MUTATION } from "@/graphql/user/updateUser";
import client from "@/utils/apollo.client";
import { parseGraphQLError } from "@/utils/parse-graphql-error";
import { requireOperationField } from "@/utils/apollo.result";

class UserService {
  static me = async (): Promise<User | null> => {
    try {
      const userResult = await client().query({
        query: ME_USER_QUERY,
      });
      return userResult.data?.meUser ?? null;
    } catch (e) {
      console.error("userResult", e);
    }
    return null;
  };

  static updateUser = async (input: UpdateMeInput) => {
    try {
      const removeAvatarResponse = await client().mutate({
        mutation: UPDATE_USER_MUTATION,
        variables: {
          updateMeInput: input,
        },
      });
      return requireOperationField(
        removeAvatarResponse,
        "updateMe",
        "Update profile",
      );
    } catch (error) {
      // Parse and throw the error with a readable message
      const errorMessage = parseGraphQLError(error);
      throw new Error(errorMessage);
    }
  };
  static removeAvatar = async () => {
    try {
      const removeAvatarResponse = await client().mutate({
        mutation: REMOVE_AVATAR_MUTATION,
        variables: {},
      });
      return requireOperationField(
        removeAvatarResponse,
        "removeMyAvatar",
        "Remove avatar",
      );
    } catch (error) {
      // Parse and throw the error with a readable message
      const errorMessage = parseGraphQLError(error);
      throw new Error(errorMessage);
    }
  };
}

export default UserService;
