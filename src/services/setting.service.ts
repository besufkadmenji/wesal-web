import { Setting } from "@/gql/graphql";
import { GET_SETTING_QUERY } from "@/graphql/setting/getSetting";
import client from "@/utils/apollo.client";

export class SettingService {
  static getSetting = async (): Promise<Setting | null> => {
    try {
      const userResult = await client().query({
        query: GET_SETTING_QUERY,
        variables: {},
      });
      return userResult.data?.getSetting ?? null;
    } catch (e) {
      console.error("userResult", e);
    }
    return null;
  };
}
