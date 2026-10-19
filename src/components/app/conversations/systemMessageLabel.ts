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
    [MessageKind.ContractProviderCompleted]: labels.contractProviderCompleted,
    [MessageKind.ContractDeliveryStarted]: labels.contractDeliveryStarted,
    [MessageKind.ContractCancellationRequested]:
      labels.contractCancellationRequested,
    [MessageKind.ContractCancelled]: labels.contractCancelled,
    [MessageKind.ContractDisputed]: labels.contractDisputed,
  };

  return labelsByKind[kind] || labels.systemEvent;
};

/**
 * BRD: a cancellation or refused-delivery reason appears in the chat. The API
 * puts it in the system event's metadata ({ contractId, reason }).
 */
export const systemMessageReason = (metadata: unknown): string | null => {
  if (!metadata || typeof metadata !== "object") return null;
  const reason = (metadata as { reason?: unknown }).reason;
  return typeof reason === "string" && reason.trim() ? reason.trim() : null;
};
