import { MoneyValue } from "@/components/app/contracts/MoneyValue";

export const FinancialRow = ({
  label,
  value,
}: {
  label: string;
  value: number;
}) => (
  <div className="flex items-center justify-between gap-4">
    <span className="text-gray text-base leading-[1.7]">{label}</span>
    <MoneyValue
      value={value}
      amountClassName="text-lg font-medium text-gray"
      currencyClassName="text-lg text-gray"
    />
  </div>
);
