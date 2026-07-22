import type { Dictionary } from "@/config/i18n/types";
import { MessageKind } from "@/gql/graphql";

export const systemMessageLabel = (
  kind: MessageKind,
  labels: Dictionary["conversations"],
) => {
  const labelsByKind: Partial<Record<MessageKind, string>> = {
    [MessageKind.ChatFeePaid]: labels.chatFeePaid,
    [MessageKind.ContractCreated]: labels.contractCreated,
    [MessageKind.ContractRejected]: labels.contractRejected,
    [MessageKind.ContractResent]: labels.contractResent,
    [MessageKind.ContractAccepted]: labels.contractAccepted,
    [MessageKind.ContractPaid]: labels.contractPaid,
    [MessageKind.ContractCompleted]: labels.contractCompleted,
  };

  return labelsByKind[kind] || labels.systemEvent;
};
