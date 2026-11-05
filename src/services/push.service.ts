import {
  REGISTER_PUSH_DEVICE_MUTATION,
  UNREGISTER_PUSH_DEVICE_MUTATION,
} from "@/graphql/push/operations";
import { requireOperationField } from "@/utils/apollo.result";
import client from "@/utils/apollo.client";

export class PushService {
  static async register(token: string, language: "ar" | "en") {
    const result = await client().mutate<{ registerPushDevice: boolean }>({
      mutation: REGISTER_PUSH_DEVICE_MUTATION,
      variables: { input: { token, language } },
    });
    return requireOperationField(
      result,
      "registerPushDevice",
      "Register push device",
    );
  }

  static async unregister(token: string) {
    const result = await client().mutate<{ unregisterPushDevice: boolean }>({
      mutation: UNREGISTER_PUSH_DEVICE_MUTATION,
      variables: { token },
    });
    return requireOperationField(
      result,
      "unregisterPushDevice",
      "Unregister push device",
    );
  }
}
