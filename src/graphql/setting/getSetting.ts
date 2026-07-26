import { GetSettingQuery } from "@/gql/graphql";
import { gql, TypedDocumentNode } from "@apollo/client";

export const GET_SETTING_QUERY: TypedDocumentNode<GetSettingQuery> = gql`
  query getSetting {
    getSetting {
      contractAcceptanceWindowDays
      contractAcceptanceWindowEnabled
      premiumAdDurationDays
      premiumAdEnabled
      premiumAdFee
      vatEnabled
      vatRate
      completionConfirmationGraceHours
      aboutAr
      aboutEn
      email
      phones
      privacyPolicyAr
      privacyPolicyEn
      socialMediaLinks {
        link
        name
      }
      termsAr
      termsEn
      whatsappNumber
      rulesAr
      rulesEn
      platformManagerName
      platformManagerSignature
    }
  }
`;
