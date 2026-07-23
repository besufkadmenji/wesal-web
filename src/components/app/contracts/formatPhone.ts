export const formatPhone = (
  dialCode?: string | null,
  phone?: string | null,
) => {
  if (!phone) return "—";
  if (phone.startsWith("+")) return phone;
  const dial = dialCode?.startsWith("+")
    ? dialCode
    : dialCode
      ? `+${dialCode}`
      : "";
  return dial ? `${dial}${phone}` : phone;
};
