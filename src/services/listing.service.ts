import {
  CreateListingInput,
  Listing,
  ListingPaginationInput,
  PaginatedListingResponse,
  UpdateListingInput,
} from "@/gql/graphql";
import { CREATE_LISTING_MUTATION } from "@/graphql/listing/createListing";
import { LISTING_QUERY } from "@/graphql/listing/listing";
import { MY_LISTINGS_QUERY } from "@/graphql/listing/myListings";
import { REMOVE_LISTING_MUTATION } from "@/graphql/listing/removeListing";
import { UPDATE_LISTING_MUTATION } from "@/graphql/listing/updateListing";
import client from "@/utils/apollo.client";
import { parseGraphQLError } from "@/utils/parse-graphql-error";

class ListingService {
  static myListings = async (
    paginationInput: ListingPaginationInput,
  ): Promise<PaginatedListingResponse | null> => {
    try {
      const listingResult = await client().query({
        query: MY_LISTINGS_QUERY,
        variables: {
          paginationInput,
        },
      });
      return listingResult.data?.myListings ?? null;
    } catch (e) {
      console.error("listingResult", e);
    }
    return null;
  };

  static listing = async (id: string): Promise<Listing | null> => {
    try {
      const listingResult = await client().query({
        query: LISTING_QUERY,
        variables: {
          listingId: id,
        },
      });
      return listingResult.data?.listing ?? null;
    } catch (e) {
      console.error("listingResult", e);
    }
    return null;
  };

  static createListing = async (input: CreateListingInput) => {
    try {
      const createListingResponse = await client().mutate({
        mutation: CREATE_LISTING_MUTATION,
        variables: {
          createListingInput: input,
        },
      });
      return createListingResponse.data?.createListing ?? null;
    } catch (error) {
      // Parse and throw the error with a readable message
      const errorMessage = parseGraphQLError(error);
      throw new Error(errorMessage);
    }
  };
  static updateListing = async (input: UpdateListingInput) => {
    try {
      const updateListingResponse = await client().mutate({
        mutation: UPDATE_LISTING_MUTATION,
        variables: {
          updateListingInput: input,
        },
      });
      return updateListingResponse.data?.updateListing ?? null;
    } catch (error) {
      // Parse and throw the error with a readable message
      const errorMessage = parseGraphQLError(error);
      throw new Error(errorMessage);
    }
  };
  static removeListing = async (removeListingId: string) => {
    try {
      const removeAvatarResponse = await client().mutate({
        mutation: REMOVE_LISTING_MUTATION,
        variables: {
          removeListingId,
        },
      });
      return removeAvatarResponse.data?.removeListing ?? null;
    } catch (error) {
      // Parse and throw the error with a readable message
      const errorMessage = parseGraphQLError(error);
      throw new Error(errorMessage);
    }
  };
}

export default ListingService;
