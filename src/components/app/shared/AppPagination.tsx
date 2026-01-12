import {
  cn,
  Pagination,
  PaginationItemRenderProps,
  PaginationItemType,
} from "@heroui/react";

import PrevIcon from "@/assets/icons/prev.svg";
import NextIcon from "@/assets/icons/next.svg";
export const AppPagination = () => {
  const renderItem = ({
    ref,
    key,
    value,
    isActive,
    onNext,
    onPrevious,
    setPage,
    className,
  }: PaginationItemRenderProps) => {
    if (value === PaginationItemType.PREV) {
      return (
        <button
          key={key}
          className={cn(
            className,
            "size-10 min-w-8 rounded-xl border border-[#F2F2F2] bg-white p-2.5 shadow-none rtl:rotate-180",
          )}
          onClick={onPrevious}
        >
          <PrevIcon />
        </button>
      );
    }

    if (value === PaginationItemType.NEXT) {
      return (
        <button
          key={key}
          className={cn(
            className,
            "size-10 min-w-8 rounded-xl border border-[#F2F2F2] bg-white p-2.5 shadow-none rtl:rotate-180",
          )}
          onClick={onNext}
        >
          <NextIcon />
        </button>
      );
    }

    if (value === PaginationItemType.DOTS) {
      return (
        <button
          key={key}
          className={cn(
            className,
            "text-gray size-10 min-w-8 rounded-xl border-none bg-white p-2.5 shadow-none",
          )}
        >
          ...
        </button>
      );
    }

    // cursor is the default item
    return (
      <button
        key={key}
        ref={ref}
        className={cn(
          className,
          "size-10 rounded-xl border border-[#F2F2F2] shadow-none",
          isActive && "bg-primary border-primary text-white",
        )}
        onClick={() => setPage(value)}
      >
        {value}
      </button>
    );
  };

  return (
    <Pagination
      disableCursorAnimation
      showControls
      className="gap-2 justify-self-center"
      initialPage={1}
      renderItem={renderItem}
      total={10}
      variant="bordered"
      size="lg"
      classNames={{
        wrapper: "flex gap-2",
      }}
    />
  );
};
