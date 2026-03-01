import { PaginatedCityResponse } from "@/gql/graphql";
import CityService from "@/services/city.service";
import { useQuery } from "@tanstack/react-query";
export const useCities = (): {
  cities: PaginatedCityResponse | null | undefined;
  isLoading: boolean;
  isError: boolean;
} => {
  const {
    isLoading,
    isError,
    data: cities,
  } = useQuery({
    queryKey: ["cities"],
    queryFn: () =>
      CityService.cities({
        page: 1,
        limit: 1000,
      }),
  });

  return { isLoading, isError, cities };
};
