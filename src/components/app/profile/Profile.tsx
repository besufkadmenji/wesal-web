"use client";
import { Wrapper } from "../support/Wrapper";
import { SupportPageType } from "@/components/app/support/Wrapper";
import { Nav } from "@/components/app/profile/Nav";
import { useMe } from "@/hooks/useMe";
import { UserRole } from "@/gql/graphql";
import { UserProfile } from "./UserProfile";
import { ProviderProfile } from "./ProviderProfile";

export const Profile = () => {
  const { me } = useMe();

  return (
    <Wrapper variant={SupportPageType.PROFILE}>
      <div className="grid grid-cols-[3fr_8fr] px-[7vw] py-20">
        <Nav />
        {me?.role === UserRole.User ? <UserProfile /> : <ProviderProfile />}
      </div>
    </Wrapper>
  );
};
