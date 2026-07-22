import { PAGINATION_FRAGMENT } from "@/graphql/common/fragments";
import { gql } from "@apollo/client";

const COMPLAINT_FRAGMENT = gql`
  fragment ComplaintFields on Complaint {
    id
    publicId
    reporterId
    reporterType
    listingId
    conversationId
    contractId
    title
    description
    attachments
    status
    reviewedAt
    createdAt
    updatedAt
    listing { id name }
    contract { id version status }
    messages { id complaintId authorId authorType content createdAt }
  }
`;

export const MY_COMPLAINTS_QUERY = gql`
  query MyComplaints($input: ComplaintPaginationInput) {
    myComplaints(input: $input) {
      items { ...ComplaintFields }
      meta { ...PaginationFields }
    }
  }
  ${COMPLAINT_FRAGMENT}
  ${PAGINATION_FRAGMENT}
`;

export const MY_COMPLAINT_QUERY = gql`
  query MyComplaint($id: String!) {
    myComplaint(id: $id) { ...ComplaintFields }
  }
  ${COMPLAINT_FRAGMENT}
`;

export const ADD_COMPLAINT_MESSAGE_MUTATION = gql`
  mutation AddComplaintMessage($complaintId: String!, $content: String!) {
    addComplaintMessage(complaintId: $complaintId, content: $content) {
      id
      complaintId
      authorId
      authorType
      content
      createdAt
    }
  }
`;

export const CREATE_COMPLAINT_MULTIPART = `
  mutation CreateComplaint($input: CreateComplaintInput!, $evidence: [Upload!]) {
    createComplaint(input: $input, evidence: $evidence) {
      id
      publicId
      reporterId
      reporterType
      listingId
      conversationId
      contractId
      title
      description
      attachments
      status
      reviewedAt
      createdAt
      updatedAt
      listing { id name }
      contract { id version status }
      messages { id complaintId authorId authorType content createdAt }
    }
  }
`;
