import { parse } from "graphql";

// The participant query is part of the companion API change and is parsed at
// runtime until that API version is deployed to the codegen schema endpoint.
export const ACTIVE_DELIVERY_COMPANIES_QUERY = parse(`
  query ActiveDeliveryCompanies {
    activeDeliveryCompanies {
      id
      nameAr
      nameEn
      status
    }
  }
`);
