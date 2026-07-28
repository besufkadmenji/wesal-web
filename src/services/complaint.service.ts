import type {
  Complaint,
  ComplaintMessage,
  ComplaintPaginationInput,
  CreateComplaintInput,
  PaginatedComplaintResponse,
} from "@/gql/graphql";
import {
  ADD_COMPLAINT_MESSAGE_MUTATION,
  CREATE_COMPLAINT_MULTIPART,
  MY_COMPLAINT_QUERY,
  MY_COMPLAINTS_QUERY,
} from "@/graphql/complaint/operations";
import { requireData, requireOperationField } from "@/utils/apollo.result";
import client from "@/utils/apollo.client";
import { graphqlMultipartRequest } from "@/utils/graphql.multipart";

export class ComplaintService {
  static async findAll(input: ComplaintPaginationInput = {}) {
    const result = await client().query<{
      myComplaints: PaginatedComplaintResponse;
    }>({ query: MY_COMPLAINTS_QUERY, variables: { input } });
    return requireData(result, "Complaints").myComplaints;
  }

  static async findOne(id: string) {
    const result = await client().query<{ myComplaint: Complaint }>({
      query: MY_COMPLAINT_QUERY,
      variables: { id },
    });
    return requireData(result, "Complaint").myComplaint;
  }

  static async create(input: CreateComplaintInput, files: File[]) {
    const result = await graphqlMultipartRequest<{ createComplaint: Complaint }>({
      query: CREATE_COMPLAINT_MULTIPART,
      variables: { input, evidence: files.map(() => null) },
      files,
      fileVariable: "evidence",
    });
    return requireOperationField(
      { data: result },
      "createComplaint",
      "Create complaint",
    );
  }

  static async reply(complaintId: string, content: string) {
    const result = await client().mutate<{
      addComplaintMessage: ComplaintMessage;
    }>({
      mutation: ADD_COMPLAINT_MESSAGE_MUTATION,
      variables: { complaintId, content },
    });
    return requireOperationField(
      result,
      "addComplaintMessage",
      "Complaint reply",
    );
  }
}
