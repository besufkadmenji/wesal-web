import { Provider, User } from "@/gql/graphql";
import ProviderService from "@/services/provider.service";
import UserService from "@/services/user.service";
import { useQuery } from "@tanstack/react-query";
import Cookie from "js-cookie";
export const useMe = (): {
  me: { user: User | null; provider: Provider | null } | null | undefined;
  isLoading: boolean;
  isLoggedIn: boolean;
  isError: boolean;
  logout: () => Promise<void>;
} => {
  const {
    isLoading,
    isError,
    data: me,
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

  const logout = async (): Promise<void> => {
    Cookie.remove("token");
    window.location.reload();
  };

  return {
    isLoading,
    isError,
    me,
    isLoggedIn: me?.provider || me?.user ? true : false,
    logout,
  };
};
