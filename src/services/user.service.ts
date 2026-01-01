import { User } from "@/gql/graphql";
import { ME_QUERY } from "@/graphql/user/me";
import client from "@/utils/apollo.client";

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
}

export default UserService;
