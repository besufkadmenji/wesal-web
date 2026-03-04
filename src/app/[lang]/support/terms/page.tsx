import { Terms } from "@/components/app/support/Terms/Terms";
import { SettingService } from "@/services/setting.service";
import { redirect } from "next/navigation";

const TermsPage = async () => {
  const setting = await SettingService.getSetting();
  if (!setting) {
    redirect("/404");
  }
  return <Terms setting={setting} />;
};

export default TermsPage;
