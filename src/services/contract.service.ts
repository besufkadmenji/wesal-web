import type {
  AcceptContractInput,
  CompleteContractInput,
  Contract,
  ContractPaginationInput,
  ContractQuote,
  ContractQuoteInput,
  CreateContractInput,
  InitializeContractInput,
  PaginatedContractResponse,
  RejectContractInput,
  ResendContractInput,
  ProviderCompleteContractInput,
  CancelContractInput,
  RefuseDeliveryInput,
} from "@/gql/graphql";
import {
  ACCEPT_CONTRACT_MUTATION,
  COMPLETE_CONTRACT_MUTATION,
  CONTRACT_QUERY,
  CONTRACT_QUOTE_QUERY,
  CONTRACTS_QUERY,
  MY_OVERDUE_CONTRACTS_QUERY,
  MY_PAID_CONTRACT_NOTICES_QUERY,
  ACKNOWLEDGE_CONTRACT_PAID_MUTATION,
  CREATE_CONTRACT_MUTATION,
  INITIALIZE_CONTRACT_MUTATION,
  REJECT_CONTRACT_MUTATION,
  RESEND_CONTRACT_MUTATION,
  PROVIDER_COMPLETE_CONTRACT_MUTATION,
  REQUEST_CONTRACT_CANCELLATION_MUTATION,
  REFUSE_CONTRACT_DELIVERY_MUTATION,
} from "@/graphql/contract/operations";
import { requireData, requireOperationField } from "@/utils/apollo.result";
import client from "@/utils/apollo.client";

type ContractReference = Pick<
  Contract,
  "id" | "publicId" | "conversationId" | "status"
>;

export class ContractService {
  static async findAll(input: ContractPaginationInput = {}) {
    const result = await client().query<{
      contracts: PaginatedContractResponse;
    }>({
      query: CONTRACTS_QUERY,
      variables: { input },
    });
    return requireData(result, "Contracts").contracts;
  }

  static async overdue() {
    const result = await client().query<{ myOverdueContracts: Contract[] }>({
      query: MY_OVERDUE_CONTRACTS_QUERY,
    });
    return requireData(result, "Overdue contracts").myOverdueContracts;
  }

  /** S4-12: paid contracts the provider hasn't been told about yet. */
  static async paidNotices() {
    const result = await client().query<{
      myPaidContractNotices: Pick<Contract, "id" | "publicId">[];
    }>({
      query: MY_PAID_CONTRACT_NOTICES_QUERY,
      fetchPolicy: "network-only",
    });
    return requireData(result, "Paid contracts").myPaidContractNotices;
  }

  static async acknowledgePaid(contractId: string) {
    const result = await client().mutate<{ acknowledgeContractPaid: boolean }>(
      {
        mutation: ACKNOWLEDGE_CONTRACT_PAID_MUTATION,
        variables: { contractId },
      },
    );
    return requireOperationField(
      result,
      "acknowledgeContractPaid",
      "Acknowledge payment",
    );
  }

  static async findOne(id: string) {
    const result = await client().query<{ contract: Contract }>({
      query: CONTRACT_QUERY,
      variables: { id },
    });
    return requireData(result, "Contract").contract;
  }

  static async quote(input: ContractQuoteInput) {
    const result = await client().query<{ contractQuote: ContractQuote }>({
      query: CONTRACT_QUOTE_QUERY,
      variables: { input },
    });
    return requireData(result, "Contract quote").contractQuote;
  }

  static async initialize(input: InitializeContractInput) {
    const result = await client().mutate<{
      initializeContract: ContractReference;
    }>({
      mutation: INITIALIZE_CONTRACT_MUTATION,
      variables: { input },
    });
    return requireOperationField(
      result,
      "initializeContract",
      "Initialize contract",
    );
  }

  static async create(input: CreateContractInput) {
    const result = await client().mutate<{
      createContract: ContractReference;
    }>({
      mutation: CREATE_CONTRACT_MUTATION,
      variables: { input },
    });
    return requireOperationField(result, "createContract", "Create contract");
  }

  static async accept(input: AcceptContractInput) {
    const result = await client().mutate<{ acceptContract: Contract }>({
      mutation: ACCEPT_CONTRACT_MUTATION,
      variables: { input },
    });
    return requireOperationField(result, "acceptContract", "Accept contract");
  }

  static async reject(input: RejectContractInput) {
    const result = await client().mutate<{ rejectContract: Contract }>({
      mutation: REJECT_CONTRACT_MUTATION,
      variables: { input },
    });
    return requireOperationField(result, "rejectContract", "Reject contract");
  }

  static async resend(input: ResendContractInput) {
    const result = await client().mutate<{ resendContract: Contract }>({
      mutation: RESEND_CONTRACT_MUTATION,
      variables: { input },
    });
    return requireOperationField(result, "resendContract", "Resend contract");
  }

  static async complete(input: CompleteContractInput) {
    const result = await client().mutate<{ completeContract: Contract }>({
      mutation: COMPLETE_CONTRACT_MUTATION,
      variables: { input },
    });
    return requireOperationField(
      result,
      "completeContract",
      "Complete contract",
    );
  }

  static async providerComplete(input: ProviderCompleteContractInput) {
    const result = await client().mutate<{
      providerCompleteContract: Contract;
    }>({
      mutation: PROVIDER_COMPLETE_CONTRACT_MUTATION,
      variables: { input },
    });
    return requireOperationField(
      result,
      "providerCompleteContract",
      "Provider completion",
    );
  }

  static async requestCancellation(input: CancelContractInput) {
    const result = await client().mutate<{
      requestContractCancellation: Contract;
    }>({
      mutation: REQUEST_CONTRACT_CANCELLATION_MUTATION,
      variables: { input },
    });
    return requireOperationField(
      result,
      "requestContractCancellation",
      "Contract cancellation",
    );
  }

  static async refuseDelivery(input: RefuseDeliveryInput) {
    const result = await client().mutate<{
      refuseContractDelivery: Contract;
    }>({
      mutation: REFUSE_CONTRACT_DELIVERY_MUTATION,
      variables: { input },
    });
    return requireOperationField(
      result,
      "refuseContractDelivery",
      "Delivery refusal",
    );
  }
}
