import { FAQ } from "@/components/app/support/FAQ/FAQ";
import { FaqService } from "@/services/faq.service";

const FAQPage = async () => {
  const faqs = await FaqService.getFaq();
  return <FAQ faqs={faqs ?? []} />;
};

export default FAQPage;
