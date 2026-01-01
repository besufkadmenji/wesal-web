import { LoginInput } from "@/gql/graphql";
import { LOGIN_MUTATION } from "@/graphql/auth/login";
import { parseGraphQLError } from "@/utils/parse-graphql-error";
import client from "@/utils/apollo.client";

class AuthService {
  static loginAdmin = async (input: LoginInput) => {
    try {
      const adminLoginResponse = await client().mutate({
        mutation: LOGIN_MUTATION,
        variables: {
          input,
        },
      });
      return adminLoginResponse.data?.login ?? null;
    } catch (error) {
      // Parse and throw the error with a readable message
      const errorMessage = parseGraphQLError(error);
      throw new Error(errorMessage);
    }
  };
}

export default AuthService;
