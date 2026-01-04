import { PaginatedCityResponse } from "@/gql/graphql";
import { CITIES as CITIES_QUERY } from "@/graphql/city/cities";
import client from "@/utils/apollo.client";

class CityService {
  static cities = async (): Promise<PaginatedCityResponse | null> => {
    try {
      const citiesResult = await client().query({
        query: CITIES_QUERY,
      });
      return citiesResult.data?.cities ?? null;
    } catch (e) {
      console.error("cities", e);
    }
    return null;
  };
}

export default CityService;
