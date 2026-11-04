import { PaymentService } from "@/services/payment.service";
import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("@/utils/apollo.client", () => ({ default: vi.fn() }));

describe("PaymentService.redirect", () => {
  const assign = vi.fn();
  vi.stubGlobal("location", {
    origin: "http://localhost:3000",
    assign,
  } as unknown as Location);

  afterEach(() => assign.mockReset());

  it("leaves for the gateway page while the payment is open", () => {
    PaymentService.redirect({
      redirectUrl: "https://gateway.test/checkout/ref",
      completed: false,
    });
    expect(assign).toHaveBeenCalledWith("https://gateway.test/checkout/ref");
  });

  it("opens our own return page once the mock settled it (temporary)", () => {
    PaymentService.redirect({
      redirectUrl: "https://web.example.test/ar/payments/return?paymentId=p1",
      completed: true,
    });
    expect(assign).toHaveBeenCalledWith("/ar/payments/return?paymentId=p1");
  });
});
