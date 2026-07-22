import { ContractDetailPage } from "@/components/app/contracts/ContractsPage";

export default async function ContractPage({
  params,
}: {
  params: Promise<{ contractId: string }>;
}) {
  const { contractId } = await params;
  return <ContractDetailPage id={contractId} />;
}
