import { renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useTermsUrl } from "./useTermsUrl";

const navigation = vi.hoisted(() => ({ query: "" }));
vi.mock("next/navigation", () => ({
  usePathname: () => "/ar/auth/register",
  useSearchParams: () => new URLSearchParams(navigation.query),
}));

describe("useTermsUrl (ClickUp 869fkvm9w)", () => {
  it("keeps the provider form's query when opening the terms", () => {
    navigation.query = "type=provider&country=%2B966";
    const { result } = renderHook(() => useTermsUrl());
    expect(result.current).toBe(
      "/ar/auth/register?type=provider&country=%2B966&show-terms=true",
    );
  });

  it("opens the terms on the customer form too", () => {
    navigation.query = "";
    const { result } = renderHook(() => useTermsUrl());
    expect(result.current).toBe("/ar/auth/register?show-terms=true");
  });
});
