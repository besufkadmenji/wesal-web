import { SignedContractStatus } from "@/gql/graphql";
import { useDict } from "@/hooks/useDict";
import { useLang } from "@/hooks/useLang";
import { twMerge } from "tailwind-merge";

type Contract = {
  status: SignedContractStatus;
  terminationRequestedAt?: unknown;
  terminationRequestReason?: string | null;
  terminationRejectedAt?: unknown;
  terminationRejectionReason?: string | null;
};

const formatDate = (value: unknown, lang: string) =>
  new Intl.DateTimeFormat(
    lang === "ar" ? "ar-SA-u-ca-gregory-nu-latn" : "en-US",
    { day: "numeric", month: "long", year: "numeric" },
  ).format(new Date(String(value)));

/**
 * S4-58: the provider's e-contract termination request, waiting for the
 * administration, or the admin's rejection of the latest one. Interim
 * design (no Figma, D-23).
 */
export const TerminationRequestNotice = ({
  contract,
}: {
  contract: Contract;
}) => {
  const dict = useDict();
  const lang = useLang();
  const copy = dict.contract.terminationRequest;
  const pending =
    contract.status === SignedContractStatus.TerminationRequested &&
    contract.terminationRequestedAt;
  const rejected =
    contract.status === SignedContractStatus.Active &&
    contract.terminationRejectedAt &&
    (!contract.terminationRequestedAt ||
      new Date(String(contract.terminationRejectedAt)) >=
        new Date(String(contract.terminationRequestedAt)));
  if (!pending && !rejected) return null;

  const title = pending ? copy.pendingTitle : copy.rejectedTitle;
  const message = (
    pending ? copy.pendingMessage : copy.rejectedMessage
  ).replace(
    "{date}",
    formatDate(
      pending
        ? contract.terminationRequestedAt
        : contract.terminationRejectedAt,
      lang,
    ),
  );
  const reasonLabel = pending ? copy.reason : copy.rejectionReason;
  const reason = pending
    ? contract.terminationRequestReason
    : contract.terminationRejectionReason;

  return (
    <div
      role="status"
      className={twMerge(
        "grid gap-2 rounded-[16px] border p-4",
        pending
          ? "border-[#F5A524] bg-[#FFF8E6]"
          : "border-[#E5E7EB] bg-[#F7F8FA]",
      )}
    >
      <h3 className="font-semibold text-black">{title}</h3>
      <p className="text-gray leading-7">{message}</p>
      {reason && (
        <p className="leading-7 text-black">
          <span className="text-gray">{reasonLabel}: </span>
          {reason}
        </p>
      )}
    </div>
  );
};
