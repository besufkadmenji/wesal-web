import { BusinessProfile } from "@/components/app/profile/BusinessProfile";
import { ProfileWrapper } from "@/components/app/profile/ProfileWrapper";
import { SupportPageType } from "@/components/app/support/Wrapper";
const BusinessProfilePage = () => {
  return (
    <ProfileWrapper variant={SupportPageType.PROFILE}>
      <BusinessProfile />
    </ProfileWrapper>
  );
};

export default BusinessProfilePage;
