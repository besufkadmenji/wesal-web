import type {
  AcceptContractInput,
  CompleteContractInput,
  Contract,
  ContractPaginationInput,
  ContractPaymentResponse,
  ContractQuote,
  ContractQuoteInput,
  CreateContractInput,
  InitializeContractInput,
  PaginatedContractResponse,
  RejectContractInput,
  ResendContractInput,
} from "@/gql/graphql";
import {
  ACCEPT_CONTRACT_MUTATION,
  COMPLETE_CONTRACT_MUTATION,
  CONTRACT_QUERY,
  CONTRACT_QUOTE_QUERY,
  CONTRACTS_QUERY,
  CREATE_CONTRACT_MUTATION,
  INITIALIZE_CONTRACT_MUTATION,
  PAY_CONTRACT_MUTATION,
  REJECT_CONTRACT_MUTATION,
  RESEND_CONTRACT_MUTATION,
} from "@/graphql/contract/operations";
import { requireData } from "@/utils/apollo.result";
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
    return requireData(result, "Initialize contract").initializeContract;
  }

  static async create(input: CreateContractInput) {
    const result = await client().mutate<{
      createContract: ContractReference;
    }>({
      mutation: CREATE_CONTRACT_MUTATION,
      variables: { input },
    });
    return requireData(result, "Create contract").createContract;
  }

  static async accept(input: AcceptContractInput) {
    const result = await client().mutate<{ acceptContract: Contract }>({
      mutation: ACCEPT_CONTRACT_MUTATION,
      variables: { input },
    });
    return requireData(result, "Accept contract").acceptContract;
  }

  static async reject(input: RejectContractInput) {
    const result = await client().mutate<{ rejectContract: Contract }>({
      mutation: REJECT_CONTRACT_MUTATION,
      variables: { input },
    });
    return requireData(result, "Reject contract").rejectContract;
  }

  static async resend(input: ResendContractInput) {
    const result = await client().mutate<{ resendContract: Contract }>({
      mutation: RESEND_CONTRACT_MUTATION,
      variables: { input },
    });
    return requireData(result, "Resend contract").resendContract;
  }

  static async pay(contractId: string) {
    const result = await client().mutate<{
      payContract: ContractPaymentResponse;
    }>({
      mutation: PAY_CONTRACT_MUTATION,
      variables: { contractId },
    });
    return requireData(result, "Pay contract").payContract;
  }

  static async complete(input: CompleteContractInput) {
    const result = await client().mutate<{ completeContract: Contract }>({
      mutation: COMPLETE_CONTRACT_MUTATION,
      variables: { input },
    });
    return requireData(result, "Complete contract").completeContract;
  }
}
