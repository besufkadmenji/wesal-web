import {
  CreateListingInput,
  TrustedListingsQuery,
  Listing,
  ListingPaginationInput,
  PaginatedListingResponse,
  UpdateListingInput,
} from "@/gql/graphql";
import { CREATE_LISTING_MUTATION } from "@/graphql/listing/createListing";
import { LISTING_QUERY } from "@/graphql/listing/listing";
import { LISTINGS_QUERY } from "@/graphql/listing/listings";
import { TRUSTED_LISTINGS_QUERY } from "@/graphql/listing/trustedListings";
import { MY_LISTING_QUERY } from "@/graphql/listing/myListing";
import { MY_LISTINGS_QUERY } from "@/graphql/listing/myListings";
import { REMOVE_LISTING_MUTATION } from "@/graphql/listing/removeListing";
import { UPDATE_LISTING_MUTATION } from "@/graphql/listing/updateListing";
import { REPUBLISH_LISTING_MUTATION } from "@/graphql/listing/republishListing";
import { FEATURE_LISTING_MUTATION } from "@/graphql/listing/featureListing";
import client from "@/utils/apollo.client";
import { parseGraphQLError } from "@/utils/parse-graphql-error";
import { requireOperationField } from "@/utils/apollo.result";

class ListingService {
  static listings = async (
    paginationInput: ListingPaginationInput,
  ): Promise<PaginatedListingResponse | null> => {
    try {
      const listingResult = await client().query({
        query: LISTINGS_QUERY,
        variables: {
          paginationInput,
        },
      });
      // The query selects only the provider fields the cards use
      // (id, isNewlyAdded); callers read the result as full listings.
      return (
        (listingResult.data?.listings as
          PaginatedListingResponse | undefined) ?? null
      );
    } catch (e) {
      console.error("listingResult", e);
    }
    return null;
  };
  /** Home carousel: one ad per Trust-badge provider (BRD 4.1.2). */
  static trustedListings = async (): Promise<
    TrustedListingsQuery["trustedListings"]
  > => {
    const result = await client().query({
      query: TRUSTED_LISTINGS_QUERY,
      fetchPolicy: "network-only",
    });
    return requireOperationField(result, "trustedListings", "Trusted listings");
  };

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

  static ownerListing = async (id: string): Promise<Listing | null> => {
    try {
      const listingResult = await client().query({
        query: MY_LISTING_QUERY,
        variables: { id },
        fetchPolicy: "network-only",
      });
      return (listingResult.data?.myListing as Listing | undefined) ?? null;
    } catch (error) {
      const errorMessage = parseGraphQLError(error);
      throw new Error(errorMessage);
    }
  };

  /** S4-62: re-publish an expired ad (featured: then pay to feature). */
  static republishListing = async (id: string, featured: boolean) => {
    try {
      const result = await client().mutate({
        mutation: REPUBLISH_LISTING_MUTATION,
        variables: { id, featured },
      });
      return requireOperationField(result, "republishListing", "Re-publish");
    } catch (error) {
      throw new Error(parseGraphQLError(error));
    }
  };

  /** S4-PAY-REFEATURE: mark an active free ad as waiting for the fee. */
  static featureListing = async (id: string) => {
    try {
      const result = await client().mutate({
        mutation: FEATURE_LISTING_MUTATION,
        variables: { id },
      });
      return requireOperationField(result, "featureListing", "Feature");
    } catch (error) {
      throw new Error(parseGraphQLError(error));
    }
  };

  static createListing = async (input: CreateListingInput) => {
    try {
      const createListingResponse = await client().mutate({
        mutation: CREATE_LISTING_MUTATION,
        variables: {
          createListingInput: input,
        },
      });
      return requireOperationField(
        createListingResponse,
        "createListing",
        "Create listing",
      );
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
      return requireOperationField(
        updateListingResponse,
        "updateListing",
        "Update listing",
      );
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
      return requireOperationField(
        removeAvatarResponse,
        "removeListing",
        "Remove listing",
      );
    } catch (error) {
      // Parse and throw the error with a readable message
      const errorMessage = parseGraphQLError(error);
      throw new Error(errorMessage);
    }
  };
}

export default ListingService;
