/** Figma header badge: a plain dot when something is unread (D-21). */
export const UnreadDot = ({ label }: { label: string }) => (
  <>
    <span
      aria-hidden
      className="bg-primary absolute -end-0.5 -top-0.5 size-2.5 rounded-full ring-2 ring-white"
    />
    <span className="sr-only">{label}</span>
  </>
);
