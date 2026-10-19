import { expect, test, type Page } from "@playwright/test";
import ar from "../../src/config/i18n/locales/ar.json";
import en from "../../src/config/i18n/locales/en.json";
import {
  CONTRACT_ID,
  CONTRACT_NUMBER,
  mockContractApi,
} from "./support/contractApi";

/**
 * S4-46: the Sprint 4 contract lifecycle in a real browser, against the
 * stateful mock in support/contractApi.ts (mock payment gateway, D-2).
 */

const reference = `TX-${CONTRACT_NUMBER}`;
const openContract = (page: Page, lang: "en" | "ar" = "en") =>
  page.goto(`/${lang}/contracts?contractId=${CONTRACT_ID}`);
const contractDialog = (page: Page) =>
  page.getByRole("dialog").filter({ hasText: reference });
const pill = (page: Page, label: string) =>
  page.locator("article").filter({ hasText: reference }).getByText(label);

test("customer pays, confirms completion, rates and exports", async ({
  page,
}) => {
  const api = await mockContractApi(page, { status: "ACCEPTED" });

  // Pay with the mock gateway.
  await openContract(page);
  await contractDialog(page)
    .getByRole("button", { name: en.contracts.pay })
    .click();
  const payment = page
    .getByRole("dialog")
    .filter({ hasText: en.contracts.paymentTitle });
  await payment.getByText(en.contracts.tabbyInstallments).click();
  await payment
    .getByRole("button", { name: en.contracts.continuePayment })
    .click();
  await expect.poll(() => api.calls.PayContract?.length).toBe(1);
  await expect(pill(page, en.contracts.inProgress)).toBeVisible();

  // The provider completes meanwhile; the customer confirms.
  api.serverSide("AWAITING_CUSTOMER_CONFIRMATION");
  await openContract(page);
  await contractDialog(page)
    .getByRole("button", { name: en.contracts.completeContract })
    .click();
  await page
    .getByRole("dialog")
    .filter({ hasText: en.contracts.completionTitle })
    .getByRole("button", { name: en.contracts.submitCompletionSignature })
    .click();
  await expect.poll(() => api.calls.CompleteContract?.length).toBe(1);
  expect(api.calls.CompleteContract[0]).toMatchObject({
    contractId: CONTRACT_ID,
  });

  // Completed page: rate, then export the contract and the tax invoice.
  await page.goto(`/en/contracts/${CONTRACT_ID}`);
  await page.getByRole("radio", { name: "5 / 5" }).click();
  await page.getByRole("textbox").fill("Great, on time");
  await page.getByRole("button", { name: en.contracts.publishRating }).click();
  await expect.poll(() => api.calls.RateContract?.length).toBe(1);
  expect(api.calls.RateContract[0]).toMatchObject({
    contractId: CONTRACT_ID,
    rating: 5,
    comment: "Great, on time",
  });

  for (const [label, filename] of [
    [en.contracts.downloadInvoice, `invoice-INV-${CONTRACT_NUMBER}.pdf`],
    [en.contracts.exportPdf, `contract-${CONTRACT_NUMBER}-v1.pdf`],
  ]) {
    const download = page.waitForEvent("download");
    await page.getByRole("button", { name: label }).click();
    expect((await download).suggestedFilename()).toBe(filename);
  }
});

test("provider completes with the stored signature", async ({ page }) => {
  const api = await mockContractApi(page, {
    role: "provider",
    status: "IN_PROGRESS",
  });

  await openContract(page);
  await contractDialog(page)
    .getByRole("button", { name: en.contracts.completeContract })
    .click();
  const completion = page
    .getByRole("dialog")
    .filter({ hasText: en.contracts.providerCompletionTitle });
  await expect(
    completion.getByText(en.contracts.providerCompletionSignature),
  ).toBeVisible();
  await completion
    .getByRole("button", { name: en.contracts.submitCompletionSignature })
    .click();

  await expect.poll(() => api.calls.ProviderCompleteContract?.length).toBe(1);
  expect(api.calls.ProviderCompleteContract[0]).toMatchObject({
    contractId: CONTRACT_ID,
    signatureData: "provider-signature.png",
  });
  await expect(pill(page, en.contracts.awaitingConfirmation)).toBeVisible();
});

test("customer cancels an in-progress contract with a required reason (Arabic)", async ({
  page,
}) => {
  const api = await mockContractApi(page, {
    status: "IN_PROGRESS",
    lang: "ar",
  });

  await openContract(page, "ar");
  await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
  await contractDialog(page)
    .getByRole("button", { name: ar.contracts.cancelContract })
    .click();
  // BRD 4.1.18: the confirm pop-up states the refund before anything is sent
  // (345 paid, 30 deposit, 6 commission).
  await expect(page.getByRole("note")).toContainText("٣١٥٫٠٠ ر.س");
  await expect(page.getByRole("note")).toContainText("٢٤٫٠٠ ر.س");
  await page
    .getByRole("button", { name: ar.contracts.confirmCancelYes })
    .click();

  const reasonDialog = page
    .getByRole("dialog")
    .filter({ hasText: ar.contracts.cancellationTitle });
  await reasonDialog.getByRole("button", { name: ar.contracts.send }).click();
  await expect(
    reasonDialog.getByText(ar.contracts.reasonRequired),
  ).toBeVisible();
  expect(api.calls.RequestContractCancellation).toBeUndefined();

  await reasonDialog
    .getByPlaceholder(ar.contracts.reasonPlaceholder)
    .fill("وجدت مقدم خدمة أقرب");
  await reasonDialog.getByRole("button", { name: ar.contracts.send }).click();
  await expect
    .poll(() => api.calls.RequestContractCancellation?.length)
    .toBe(1);
  expect(api.calls.RequestContractCancellation[0]).toMatchObject({
    contractId: CONTRACT_ID,
    reason: "وجدت مقدم خدمة أقرب",
  });

  await expect(pill(page, ar.contracts.cancelled)).toBeVisible();
  await openContract(page, "ar");
  await expect(
    contractDialog(page).getByText("وجدت مقدم خدمة أقرب"),
  ).toBeVisible();
});

test("cancelling before payment removes the contract (BRD 4.1.18)", async ({
  page,
}) => {
  const api = await mockContractApi(page, { status: "ACCEPTED" });

  await openContract(page);
  await contractDialog(page)
    .getByRole("button", { name: en.contracts.cancelContract })
    .click();
  await expect(page.getByRole("note")).toHaveText(en.contracts.outcomeNoCharge);
  await page
    .getByRole("button", { name: en.contracts.confirmCancelYes })
    .click();
  const reasonDialog = page
    .getByRole("dialog")
    .filter({ hasText: en.contracts.cancellationTitle });
  await reasonDialog
    .getByPlaceholder(en.contracts.reasonPlaceholder)
    .fill("Found another provider");
  await reasonDialog.getByRole("button", { name: en.contracts.send }).click();

  await expect
    .poll(() => api.calls.RequestContractCancellation?.length)
    .toBe(1);
  await expect(page.getByText(en.contracts.removedToast)).toBeVisible();
  await expect(
    page.locator("article").filter({ hasText: reference }),
  ).toHaveCount(0);

  // An old link to it explains that it no longer exists.
  await openContract(page);
  await expect(page.getByText(en.contracts.removedTitle)).toBeVisible();
});

test("customer refuses receipt of a delivery and it goes under review", async ({
  page,
}) => {
  const api = await mockContractApi(page, { status: "DELIVERY_IN_PROGRESS" });

  await openContract(page);
  await contractDialog(page)
    .getByRole("button", { name: en.contracts.rejectDelivery })
    .click();
  const reasonDialog = page
    .getByRole("dialog")
    .filter({ hasText: en.contracts.refuseDeliveryTitle });
  await expect(reasonDialog.getByRole("note")).toHaveText(
    en.contracts.outcomeHeld,
  );
  await reasonDialog
    .getByPlaceholder(en.contracts.reasonPlaceholder)
    .fill("The item arrived damaged");
  await reasonDialog.getByRole("button", { name: en.contracts.send }).click();

  await expect.poll(() => api.calls.RefuseContractDelivery?.length).toBe(1);
  expect(api.calls.RefuseContractDelivery[0]).toMatchObject({
    contractId: CONTRACT_ID,
    reason: "The item arrived damaged",
  });
  await expect(pill(page, en.contracts.underReview)).toBeVisible();

  // The held view tells the customer why and what happens next.
  await openContract(page);
  const held = contractDialog(page);
  await expect(held.getByText(en.contracts.heldTitle)).toBeVisible();
  await expect(
    held.getByText(en.contracts.heldRefusedReceipt, { exact: false }),
  ).toBeVisible();
  await expect(held.getByText("The item arrived damaged")).toBeVisible();
  await expect(
    held.getByRole("link", { name: en.contracts.contactUs }),
  ).toBeVisible();
});

test("an overdue contract blocks the platform until its details are opened", async ({
  page,
}) => {
  const api = await mockContractApi(page, {
    status: "AWAITING_CUSTOMER_CONFIRMATION",
  });
  api.setOverdue(true);

  await page.goto("/en");
  const gate = page
    .getByRole("dialog")
    .filter({ hasText: en.contracts.overdueTitle });
  await expect(gate).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(gate).toBeVisible();

  await gate.getByRole("button", { name: en.contracts.overdueDetails }).click();
  await expect(page).toHaveURL(new RegExp(`contractId=${CONTRACT_ID}`));
  // By text, not role: the open contract dialog marks other dialogs
  // aria-hidden, which a role query would mistake for "gone".
  await expect(page.getByText(en.contracts.overdueTitle)).toHaveCount(0);
  await expect(
    contractDialog(page).getByRole("button", {
      name: en.contracts.completeContract,
    }),
  ).toBeVisible();
});
