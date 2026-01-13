import { SignedContract } from "@/components/app/profile/SignedContract/SignedContract";
import { ProfileWrapper } from "@/components/app/profile/ProfileWrapper";
import { SupportPageType } from "@/components/app/support/Wrapper";
const SignedContractPage = () => {
  return (
    <ProfileWrapper variant={SupportPageType.SIGNED_CONTRACT}>
      <SignedContract />
    </ProfileWrapper>
  );
};

export default SignedContractPage;
