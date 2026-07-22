import { FavoritesPage } from "@/components/app/favorites/FavoritesPage";
import { ProfileWrapper } from "@/components/app/profile/ProfileWrapper";
import { SupportPageType } from "@/components/app/support/Wrapper";

export default function FavoriteProvidersPage() {
  return (
    <ProfileWrapper variant={SupportPageType.PROFILE}>
      <FavoritesPage />
    </ProfileWrapper>
  );
}
