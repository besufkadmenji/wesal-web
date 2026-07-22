import { ContractForm } from "@/components/app/contracts/ContractForm";

export default async function ResendContractPage({
  params,
}: {
  params: Promise<{ contractId: string }>;
}) {
  const { contractId } = await params;
  return <ContractForm rejectedContractId={contractId} />;
}
