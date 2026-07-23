import AuthProviderService from "@/services/auth.provider.service";
import AuthService from "@/services/auth.service";

export const getProfileAuthService = (isProvider: boolean) =>
  isProvider ? AuthProviderService : AuthService;
