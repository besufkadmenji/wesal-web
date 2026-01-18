"use client";
import { SettingService } from "@/services/setting.service";
import { useQuery } from "@tanstack/react-query";

export const useSetting = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["setting"],
    queryFn: () => SettingService.getSetting(),
  });

  return {
    setting: data,
    isLoading,
    isError,
    error,
  };
};
