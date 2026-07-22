import { SkeletonBlock } from "@/components/app/shared/ParticipantUI";

export const ContractCardSkeleton = () => (
  <article
    className="flex h-[254px] flex-col gap-4 overflow-hidden rounded-[20px] border border-[#f2f2f2] bg-white pb-3"
    aria-hidden="true"
  >
    <header className="flex h-20 items-center gap-3 bg-[#fbfbfb] p-3">
      <SkeletonBlock className="size-10 shrink-0 rounded-xl" />
      <div className="grid min-w-0 flex-1 gap-2">
        <SkeletonBlock className="h-4 w-2/3 rounded-lg" />
        <SkeletonBlock className="h-3 w-24 rounded-lg" />
      </div>
      <SkeletonBlock className="h-7 w-20 rounded-full" />
    </header>
    <div className="flex items-center justify-between gap-4 px-3">
      <SkeletonBlock className="h-4 w-24 rounded-lg" />
      <SkeletonBlock className="h-6 w-20 rounded-lg" />
    </div>
    <div className="flex items-center justify-between gap-4 px-3">
      <SkeletonBlock className="h-3.5 w-28 rounded-lg" />
      <SkeletonBlock className="h-3.5 w-24 rounded-lg" />
    </div>
    <SkeletonBlock className="mx-3 mt-auto h-[50px] rounded-[20px]" />
  </article>
);

export const ContractDetailSkeleton = () => (
  <main className="bg-[#fcfdfe] px-4 py-12 md:px-8 xl:px-[7vw] xl:py-20">
    <div className="mx-auto grid max-w-5xl gap-6" aria-hidden="true">
      <header className="flex items-center gap-3 rounded-[20px] bg-white p-5">
        <SkeletonBlock className="size-10 shrink-0 rounded-xl" />
        <div className="grid flex-1 gap-2">
          <SkeletonBlock className="h-6 w-44 rounded-lg" />
          <SkeletonBlock className="h-3.5 w-36 rounded-lg" />
        </div>
        <SkeletonBlock className="h-8 w-24 rounded-full" />
      </header>
      <section className="grid gap-6 rounded-[20px] bg-white p-5 md:p-7">
        <div className="grid gap-4 md:grid-cols-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="grid h-[74px] gap-2 rounded-[14px] border border-[#f2f2f2] p-4"
            >
              <SkeletonBlock className="h-3 w-24 rounded-lg" />
              <SkeletonBlock className="h-4 w-2/3 rounded-lg" />
            </div>
          ))}
        </div>
        <div className="grid gap-4 rounded-[16px] bg-[#f8f9fb] p-5">
          <SkeletonBlock className="h-5 w-32 rounded-lg" />
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="flex justify-between gap-6">
              <SkeletonBlock className="h-3.5 w-28 rounded-lg" />
              <SkeletonBlock className="h-3.5 w-20 rounded-lg" />
            </div>
          ))}
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {Array.from({ length: 2 }).map((_, index) => (
            <div key={index} className="grid gap-2">
              <SkeletonBlock className="h-4 w-24 rounded-lg" />
              <SkeletonBlock className="h-32 rounded-[14px]" />
            </div>
          ))}
        </div>
      </section>
    </div>
  </main>
);

export const ContractFormSkeleton = () => (
  <div
    className="mx-auto grid max-w-[1232px] gap-6 px-4 py-12 md:px-8 xl:px-[7vw] xl:py-20"
    aria-hidden="true"
  >
    <header className="flex items-start gap-4 rounded-[20px] bg-white px-6 py-4">
      <div className="grid flex-1 gap-3">
        <SkeletonBlock className="h-5 w-44 rounded-lg" />
        <SkeletonBlock className="h-4 w-96 max-w-full rounded-lg" />
      </div>
      <SkeletonBlock className="size-[60px] shrink-0 rounded-[20px]" />
    </header>
    {Array.from({ length: 3 }).map((_, section) => (
      <section key={section} className="grid gap-5 rounded-[20px] bg-white p-6">
        <SkeletonBlock className="h-6 w-48 rounded-lg" />
        <div className="grid gap-4 md:grid-cols-2">
          {Array.from({ length: section === 0 ? 4 : 2 }).map((_, index) => (
            <SkeletonBlock key={index} className="h-20 rounded-[14px]" />
          ))}
        </div>
      </section>
    ))}
  </div>
);
