"use client";

import type { Contract } from "@/gql/graphql";
import { useDict } from "@/hooks/useDict";

export const ContractLifecycleHistory = ({
  contract,
}: {
  contract: Contract;
}) => {
  const dict = useDict();
  const events = [...(contract.audits ?? [])].sort(
    (left, right) =>
      new Date(String(left.createdAt)).getTime() -
      new Date(String(right.createdAt)).getTime(),
  );
  const settlements = [...(contract.settlements ?? [])].sort(
    (left, right) =>
      new Date(String(left.createdAt)).getTime() -
      new Date(String(right.createdAt)).getTime(),
  );
  if (!events.length && !settlements.length) return null;

  return (
    <section className="grid gap-4">
      <h3 className="text-start text-lg font-semibold">
        {dict.contracts.lifecycleHistory}
      </h3>
      <div className="grid gap-3">
        {events.map((event) => (
          <div
            key={event.id}
            className="border-border rounded-[16px] border p-4 text-start"
          >
            <strong>{event.action.replaceAll("_", " ")}</strong>
            <p className="text-gray text-sm">
              {event.previousStatus.replaceAll("_", " ")} →{" "}
              {event.newStatus.replaceAll("_", " ")}
            </p>
            {event.reason && <p className="mt-1 text-sm">{event.reason}</p>}
            <time className="text-gray text-xs">
              {new Date(String(event.createdAt)).toLocaleString()}
            </time>
          </div>
        ))}
      </div>
      {settlements.length > 0 && (
        <div className="grid gap-2">
          <h4 className="text-start font-semibold">
            {dict.contracts.settlements}
          </h4>
          {settlements.map((settlement) => (
            <div
              key={settlement.id}
              className="border-border flex items-center justify-between rounded-[16px] border p-4"
            >
              <span>{settlement.type.replaceAll("_", " ")}</span>
              <strong>{settlement.amount}</strong>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
