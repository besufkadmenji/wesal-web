import { Faq } from "@/gql/graphql";
import { FAQS_QUERY } from "@/graphql/faq/faqs";
import client from "@/utils/apollo.client";

export class FaqService {
  static getFaq = async (): Promise<Faq[] | null> => {
    try {
      const userResult = await client().query({
        query: FAQS_QUERY,
        variables: {},
      });
      return userResult.data?.faqs ?? null;
    } catch (e) {
      console.error("userResult", e);
    }
    return null;
  };
}
