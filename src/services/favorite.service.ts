import type {
  FavoritePaginationInput,
  PaginatedFavoriteResponse,
} from "@/gql/graphql";
import {
  IS_PROVIDER_FAVORITE_QUERY,
  MY_FAVORITES_QUERY,
  SET_PROVIDER_FAVORITE_MUTATION,
} from "@/graphql/favorite/operations";
import { requireData, requireOperationField } from "@/utils/apollo.result";
import client from "@/utils/apollo.client";

export class FavoriteService {
  static async findAll(input: FavoritePaginationInput = {}) {
    const result = await client().query<{
      myFavoriteProviders: PaginatedFavoriteResponse;
    }>({ query: MY_FAVORITES_QUERY, variables: { input } });
    return requireData(result, "Favorite providers").myFavoriteProviders;
  }

  static async isFavorite(providerId: string) {
    const result = await client().query<{ isProviderFavorite: boolean }>({
      query: IS_PROVIDER_FAVORITE_QUERY,
      variables: { providerId },
    });
    return requireData(result, "Favorite state").isProviderFavorite;
  }

  static async setFavorite(providerId: string, favorite: boolean) {
    const result = await client().mutate<{ setProviderFavorite: boolean }>({
      mutation: SET_PROVIDER_FAVORITE_MUTATION,
      variables: { providerId, favorite },
    });
    return requireOperationField(
      result,
      "setProviderFavorite",
      "Set favorite",
    );
  }
}
