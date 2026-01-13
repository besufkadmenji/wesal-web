import { Profile } from "@/components/app/profile/Profile";
import { ProfileWrapper } from "@/components/app/profile/ProfileWrapper";
import { SupportPageType } from "@/components/app/support/Wrapper";
const ProfilePage = () => {
  return (
    <ProfileWrapper variant={SupportPageType.PROFILE}>
      <Profile />
    </ProfileWrapper>
  );
};

export default ProfilePage;
