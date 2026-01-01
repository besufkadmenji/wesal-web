import { User } from "@/gql/graphql";
import UserService from "@/services/user.service";
import { useQuery } from "@tanstack/react-query";
import Cookie from "js-cookie";
export const useMe = (): {
  me: User | null | undefined;
  isLoading: boolean;
  isError: boolean;
  logout: () => Promise<void>;
} => {
  const {
    isLoading,
    isError,
    data: me,
  } = useQuery({
    queryKey: ["me"],
    queryFn: () => UserService.me(),
  });

  const logout = async (): Promise<void> => {
    Cookie.remove("token");
    window.location.reload();
  };

  return { isLoading, isError, me, logout };
};
