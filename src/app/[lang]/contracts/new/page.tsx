import { ContractForm } from "@/components/app/contracts/ContractForm";

export default async function NewContractPage({
  searchParams,
}: {
  searchParams: Promise<{ conversationId?: string }>;
}) {
  const { conversationId } = await searchParams;
  return <ContractForm conversationId={conversationId} />;
}
