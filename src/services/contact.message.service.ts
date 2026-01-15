import {
  CreateContactMessageInput
} from "@/gql/graphql";
import { CREATE_CONTACT_MESSAGE_MUTATION } from "@/graphql/contactMessage/createContactMessage";
import client from "@/utils/apollo.client";
import { parseGraphQLError } from "@/utils/parse-graphql-error";

class ContactMessageService {
  static createContactMessage = async (input: CreateContactMessageInput) => {
    try {
      const removeAvatarResponse = await client().mutate({
        mutation: CREATE_CONTACT_MESSAGE_MUTATION,
        variables: {
          createContactMessageInput: input,
        },
      });
      return removeAvatarResponse.data?.createContactMessage ?? null;
    } catch (error) {
      // Parse and throw the error with a readable message
      const errorMessage = parseGraphQLError(error);
      throw new Error(errorMessage);
    }
  };
}

export default ContactMessageService;
