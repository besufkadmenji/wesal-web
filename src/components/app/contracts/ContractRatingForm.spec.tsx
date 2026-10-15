import { ContractRatingForm } from "@/components/app/contracts/ContractRatingForm";
import en from "@/config/i18n/locales/en.json";
import { RatingService } from "@/services/rating.service";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/assets/icons/rating.svg", () => ({
  default: (props: object) => <svg {...props} />,
}));
vi.mock("@/hooks/useDict", () => ({ useDict: () => en }));
vi.mock("@/services/rating.service", () => ({
  RatingService: { rateContract: vi.fn() },
}));
vi.mock("@/utils/show.messages", () => ({
  showErrorMessage: vi.fn(),
  showSuccessMessage: vi.fn(),
}));

const renderForm = (onRated = vi.fn()) => {
  const client = new QueryClient({
    defaultOptions: { mutations: { retry: false } },
  });
  render(
    <QueryClientProvider client={client}>
      <ContractRatingForm contractId="contract-1" onRated={onRated} />
    </QueryClientProvider>,
  );
  return onRated;
};

describe("ContractRatingForm", () => {
  beforeEach(() => {
    vi.mocked(RatingService.rateContract).mockReset();
  });
  afterEach(cleanup);

  it("keeps publishing disabled until a star is chosen", async () => {
    renderForm();
    const publish = screen.getByRole("button", {
      name: en.contracts.publishRating,
    });
    expect(publish).toBeDisabled();

    await userEvent.click(screen.getByRole("radio", { name: "4 / 5" }));
    expect(publish).toBeEnabled();
    expect(screen.getByRole("radio", { name: "4 / 5" })).toHaveAttribute(
      "aria-checked",
      "true",
    );
  });

  it("submits the stars with a trimmed comment and reports success", async () => {
    vi.mocked(RatingService.rateContract).mockResolvedValue({} as never);
    const onRated = renderForm();

    await userEvent.click(screen.getByRole("radio", { name: "5 / 5" }));
    await userEvent.type(screen.getByRole("textbox"), "  Excellent work  ");
    await userEvent.click(
      screen.getByRole("button", { name: en.contracts.publishRating }),
    );

    await waitFor(() => expect(onRated).toHaveBeenCalled());
    expect(RatingService.rateContract).toHaveBeenCalledWith({
      contractId: "contract-1",
      rating: 5,
      comment: "Excellent work",
    });
  });

  it("omits an empty comment", async () => {
    vi.mocked(RatingService.rateContract).mockResolvedValue({} as never);
    const onRated = renderForm();

    await userEvent.click(screen.getByRole("radio", { name: "3 / 5" }));
    await userEvent.click(
      screen.getByRole("button", { name: en.contracts.publishRating }),
    );

    await waitFor(() => expect(onRated).toHaveBeenCalled());
    expect(RatingService.rateContract).toHaveBeenCalledWith({
      contractId: "contract-1",
      rating: 3,
      comment: undefined,
    });
  });
});
