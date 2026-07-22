import { ACTIVE_DELIVERY_COMPANIES_QUERY } from "@/graphql/deliveryCompany/activeDeliveryCompanies";
import { requireData } from "@/utils/apollo.result";
import client from "@/utils/apollo.client";

export type DeliveryCompanyOption = {
  id: string;
  nameAr: string;
  nameEn: string;
  status: string;
};

export class DeliveryCompanyService {
  static async findActive() {
    const result = await client().query<{
      activeDeliveryCompanies: DeliveryCompanyOption[];
    }>({ query: ACTIVE_DELIVERY_COMPANIES_QUERY });
    return requireData(result, "Delivery companies").activeDeliveryCompanies;
  }
}
