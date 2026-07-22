export const formatPhone = (
  dialCode?: string | null,
  phone?: string | null,
) => {
  if (!phone) return "—";
  const dial = dialCode?.startsWith("+")
    ? dialCode
    : dialCode
      ? `+${dialCode}`
      : "";
  return dial ? `${dial}${phone}` : phone;
};
