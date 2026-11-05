import { MessageBubble } from "@/components/app/conversations/MessageBubble";
import en from "@/config/i18n/locales/en.json";
import {
  ConversationSenderType,
  MessageKind,
  type Message,
} from "@/gql/graphql";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("@/hooks/useDict", () => ({ useDict: () => en }));
vi.mock("next/navigation", () => ({ useParams: () => ({ lang: "en" }) }));
vi.mock("@/hooks/useMe", () => ({ useMe: () => ({ me: { user: { id: "u1" } } }) }));
vi.mock("next/image", () => ({
  default: ({ alt, src }: { alt: string; src: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img alt={alt} src={src} />
  ),
}));

const message = (metadata: unknown, content = "") =>
  ({
    id: "m1",
    conversationId: "c1",
    senderId: "u1",
    senderType: ConversationSenderType.User,
    kind: MessageKind.Text,
    content,
    metadata,
    createdAt: new Date().toISOString(),
  }) as unknown as Message;

describe("MessageBubble photos (ClickUp 869fnwhm3)", () => {
  afterEach(cleanup);

  it("shows a sent photo and links to the full size", () => {
    render(
      <MessageBubble
        message={message({
          attachment: {
            filename: "abc.jpg",
            originalFilename: "kitchen.jpg",
            size: 10,
          },
        })}
      />,
    );
    const img = screen.getByAltText("kitchen.jpg");
    expect(img.getAttribute("src")).toContain("/files/abc.jpg");
    expect(
      screen.getByRole("link", { name: en.conversations.openPhoto }),
    ).toBeTruthy();
  });

  it("keeps plain text messages unchanged", () => {
    render(<MessageBubble message={message(null, "hola")} />);
    expect(screen.getByText("hola")).toBeTruthy();
    expect(screen.queryByRole("img")).toBeNull();
  });
});
