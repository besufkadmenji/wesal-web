import { ChangePassword } from "@/components/app/profile/ChangePassword";
import { ProfileWrapper } from "@/components/app/profile/ProfileWrapper";
import { SupportPageType } from "@/components/app/support/Wrapper";
const ChangePasswordPage = () => {
  return (
    <ProfileWrapper variant={SupportPageType.PROFILE}>
      <ChangePassword />
    </ProfileWrapper>
  );
};

export default ChangePasswordPage;
