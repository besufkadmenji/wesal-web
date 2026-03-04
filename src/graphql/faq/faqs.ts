import { FaqsQuery } from "@/gql/graphql";
import { gql, TypedDocumentNode } from "@apollo/client";

export const FAQS_QUERY: TypedDocumentNode<FaqsQuery> = gql`
  query faqs {
    faqs {
      answerAr
      answerEn
      createdAt
      id
      isActive
      order
      publicId
      questionAr
      questionEn
      updatedAt
    }
  }
`;
