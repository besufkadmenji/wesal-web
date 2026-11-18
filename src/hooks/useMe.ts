import { Provider, User } from "@/gql/graphql";
import ProviderService from "@/services/provider.service";
import UserService from "@/services/user.service";
import { useQuery } from "@tanstack/react-query";
import Cookie from "js-cookie";
import { disablePush } from "@/utils/push";
import { useHydrated } from "@/hooks/useHydrated";
export const useMe = (): {
  me: { user: User | null; provider: Provider | null } | null | undefined;
  isLoading: boolean;
  isLoggedIn: boolean;
  isError: boolean;
  logout: (noReload?: boolean) => Promise<void>;
} => {
  const hydrated = useHydrated();
  const {
    isLoading: isFetching,
    isError,
    data,
  } = useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const [userMe, providerMe] = await Promise.all([
        UserService.me(),
        ProviderService.me(),
      ]);
      return {
        user: userMe,
        provider: providerMe,
      };
    },
  });

  const logout = async (noReload?: boolean): Promise<void> => {
    // ClickUp 869fp1jmt: stop push to this browser while still signed in.
    await disablePush();
    Cookie.remove("token");
    if (!noReload) {
      window.location.reload();
    }
  };

  // H-50: the server never knows who is signed in, so until hydration ends
  // report "loading" like the server render did; otherwise a part of the
  // page that hydrates after `me` arrives renders signed-in UI over the
  // signed-out server HTML and React throws a hydration error.
  const me = hydrated ? data : undefined;
  return {
    isLoading: !hydrated || isFetching,
    isError,
    me,
    isLoggedIn: me?.provider || me?.user ? true : false,
    logout,
  };
};
