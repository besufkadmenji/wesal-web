'use client';

import { Skeleton } from '@heroui/react';

export const DetailSkeleton = () => {
  return (
    <div className="grid grid-cols-1 gap-8 bg-white p-6 rounded-[20px]">
      {/* Price Section */}
      <div className="grid grid-cols-1 gap-4">
        <Skeleton className="rounded-lg">
          <div className="bg-default-300 h-10 w-32" />
        </Skeleton>
        <Skeleton className="rounded-lg">
          <div className="bg-default-300 h-6 w-full max-w-2xl" />
        </Skeleton>
        <Skeleton className="rounded-lg">
          <div className="bg-default-300 h-5 w-24" />
        </Skeleton>
      </div>

      {/* Images Gallery Section */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Main Image */}
        <div>
          <Skeleton className="rounded-[20px]">
            <div className="bg-default-300 h-96 w-full" />
          </Skeleton>
        </div>

        {/* Thumbnail Images */}
        <div className="grid grid-cols-2 gap-3 auto-rows-max">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="rounded-[20px]">
              <div className="bg-default-300 h-40 w-full" />
            </Skeleton>
          ))}
        </div>
      </div>

      {/* Video Section */}
      <div className="grid grid-cols-1 gap-4">
        <Skeleton className="rounded-lg">
          <div className="bg-default-300 h-6 w-40" />
        </Skeleton>
        <Skeleton className="rounded-[20px]">
          <div className="bg-default-300 h-64 w-full" />
        </Skeleton>
      </div>

      {/* Edit Button */}
      <Skeleton className="rounded-lg w-fit">
        <div className="bg-default-300 h-10 w-32" />
      </Skeleton>

      {/* About Section */}
      <div className="grid grid-cols-1 gap-4">
        <Skeleton className="rounded-lg">
          <div className="bg-default-300 h-6 w-48" />
        </Skeleton>
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="rounded-lg">
              <div className="bg-default-300 h-4 w-full" />
            </Skeleton>
          ))}
          <Skeleton className="rounded-lg w-2/3">
            <div className="bg-default-300 h-4 w-full" />
          </Skeleton>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="grid grid-cols-1 gap-6">
        <div className="grid grid-cols-1 gap-4">
          <Skeleton className="rounded-lg">
            <div className="bg-default-300 h-6 w-40" />
          </Skeleton>
          <Skeleton className="rounded-lg">
            <div className="bg-default-300 h-5 w-32" />
          </Skeleton>
        </div>

        {/* Review Items */}
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="border-t border-gray-200 pt-4 grid grid-cols-1 gap-3">
            <div className="flex items-center gap-3">
              <Skeleton className="rounded-full">
                <div className="bg-default-300 h-10 w-10 rounded-full" />
              </Skeleton>
              <div className="flex-1 grid gap-2">
                <Skeleton className="rounded-lg w-2/3">
                  <div className="bg-default-300 h-4 w-full" />
                </Skeleton>
                <Skeleton className="rounded-lg w-1/3">
                  <div className="bg-default-300 h-3 w-full" />
                </Skeleton>
              </div>
            </div>
            <Skeleton className="rounded-lg">
              <div className="bg-default-300 h-4 w-12" />
            </Skeleton>
            <div className="space-y-2">
              {Array.from({ length: 2 }).map((_, j) => (
                <Skeleton key={j} className="rounded-lg">
                  <div className="bg-default-300 h-4 w-full" />
                </Skeleton>
              ))}
            </div>
          </div>
        ))}

        {/* View More Reviews Button */}
        <Skeleton className="rounded-lg w-fit">
          <div className="bg-default-300 h-10 w-40" />
        </Skeleton>
      </div>
    </div>
  );
};
