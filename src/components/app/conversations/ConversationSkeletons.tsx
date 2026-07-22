import { SkeletonBlock } from "@/components/app/shared/ParticipantUI";
import { cn } from "@/lib/utils";

export const ConversationListSkeleton = ({ rows = 6 }: { rows?: number }) => (
  <div className="grid auto-rows-max" aria-hidden="true">
    {Array.from({ length: rows }).map((_, index) => (
      <div
        key={index}
        className="border-border flex min-h-[132px] items-start gap-3 border-b p-6"
      >
        <SkeletonBlock className="size-12.5 shrink-0 rounded-full" />
        <div className="grid min-w-0 flex-1 gap-3 pt-1">
          <div className="flex items-center justify-between gap-4">
            <SkeletonBlock className="h-5 w-2/5 rounded-lg" />
            <SkeletonBlock className="h-3 w-24 rounded-lg" />
          </div>
          <SkeletonBlock className="h-4 w-3/5 rounded-lg" />
        </div>
      </div>
    ))}
  </div>
);

export const ConversationMessagesSkeleton = ({
  rows = 5,
}: {
  rows?: number;
}) => (
  <div
    className="grid h-full auto-rows-max gap-5 p-4 md:p-6"
    aria-hidden="true"
  >
    {Array.from({ length: rows }).map((_, index) => {
      const mine = index % 2 === 1;
      return (
        <div
          key={index}
          className={cn("flex", mine ? "justify-end" : "justify-start")}
        >
          <div className="grid w-[min(70%,420px)] gap-3 rounded-[14px] bg-[#f6f7fa] px-4 py-3">
            <SkeletonBlock
              className={cn(
                "h-4 rounded-lg",
                index % 3 === 0 ? "w-4/5" : "w-full",
              )}
            />
            <SkeletonBlock className="h-4 w-3/5 rounded-lg" />
            <SkeletonBlock className="h-2.5 w-16 rounded-lg" />
          </div>
        </div>
      );
    })}
  </div>
);

export const ConversationThreadSkeleton = () => (
  <div
    className="grid h-full grid-rows-[auto_auto_1fr_auto] overflow-hidden rounded-[20px] bg-white"
    aria-hidden="true"
  >
    <div className="border-border flex items-center gap-3 border-b p-4 md:p-6">
      <SkeletonBlock className="size-12 shrink-0 rounded-full" />
      <div className="grid flex-1 gap-2">
        <SkeletonBlock className="h-5 w-40 rounded-lg" />
        <SkeletonBlock className="h-3.5 w-56 max-w-full rounded-lg" />
      </div>
      <SkeletonBlock className="size-10 rounded-xl" />
      <SkeletonBlock className="size-10 rounded-xl" />
    </div>
    <div className="border-border flex items-center justify-between border-b px-4 py-3 md:px-6">
      <SkeletonBlock className="h-10 w-36 rounded-xl" />
      <SkeletonBlock className="h-8 w-28 rounded-full" />
    </div>
    <ConversationMessagesSkeleton />
    <div className="border-border flex gap-4 border-t p-4">
      <SkeletonBlock className="h-14 flex-1 rounded-[16px]" />
      <SkeletonBlock className="size-12.5 rounded-[20px]" />
    </div>
  </div>
);
