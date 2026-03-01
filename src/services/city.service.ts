import { CityPaginationInput, PaginatedCityResponse } from "@/gql/graphql";
import { CITIES as CITIES_QUERY } from "@/graphql/city/cities";
import client from "@/utils/apollo.client";

class CityService {
  static cities = async (
    pagination?: CityPaginationInput,
  ): Promise<PaginatedCityResponse | null> => {
    try {
      const citiesResult = await client().query({
        query: CITIES_QUERY,
        variables: {
          pagination,
        },
      });
      return citiesResult.data?.cities ?? null;
    } catch (e) {
      console.error("cities", e);
    }
    return null;
  };
}

export default CityService;
