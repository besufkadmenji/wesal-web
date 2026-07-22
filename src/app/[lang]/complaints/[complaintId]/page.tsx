import { ComplaintDetailPage } from "@/components/app/complaints/ComplaintsPage";

export default async function SupportRequestPage({
  params,
}: {
  params: Promise<{ complaintId: string }>;
}) {
  const { complaintId } = await params;
  return <ComplaintDetailPage id={complaintId} />;
}
