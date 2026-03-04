import { PrivacyPolicy } from "@/components/app/support/PrivacyPolicy/PrivacyPolicy";
import { SettingService } from "@/services/setting.service";
import { redirect } from "next/navigation";

const PrivacyPolicyPage = async () => {
  const setting = await SettingService.getSetting();
  if (!setting) {
    redirect("/404");
  }
  return <PrivacyPolicy setting={setting} />;
};

export default PrivacyPolicyPage;
