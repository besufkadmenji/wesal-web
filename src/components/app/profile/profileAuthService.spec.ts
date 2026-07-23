import AuthProviderService from "@/services/auth.provider.service";
import AuthService from "@/services/auth.service";
import { describe, expect, it } from "vitest";
import { getProfileAuthService } from "./profileAuthService";

describe("getProfileAuthService", () => {
  it("uses provider authentication operations for providers", () => {
    expect(getProfileAuthService(true)).toBe(AuthProviderService);
  });

  it("retains customer authentication operations for non-providers", () => {
    expect(getProfileAuthService(false)).toBe(AuthService);
  });
});
