import { useStickToBottom } from "@/components/app/conversations/useStickToBottom";
import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

const scrollTo = vi.fn();

const Thread = ({ lastId, isOwn }: { lastId?: string; isOwn: boolean }) => {
  const { containerRef, contentRef } = useStickToBottom(lastId, isOwn);
  return lastId ? (
    <div
      ref={(node) => {
        containerRef.current = node;
        if (node) {
          // jsdom has no layout: a 1000px list in a 300px box.
          Object.defineProperty(node, "scrollHeight", {
            value: 1000,
            configurable: true,
          });
          Object.defineProperty(node, "clientHeight", {
            value: 300,
            configurable: true,
          });
          node.scrollTo = scrollTo as unknown as typeof node.scrollTo;
        }
      }}
    >
      <div ref={contentRef} />
    </div>
  ) : null;
};

const scrollUp = (container: HTMLElement) => {
  container.scrollTop = 0;
  container.dispatchEvent(new Event("scroll"));
};

describe("useStickToBottom", () => {
  afterEach(() => {
    cleanup();
    scrollTo.mockReset();
  });

  it("opens the chat at the newest message", () => {
    render(<Thread lastId="m1" isOwn={false} />);
    expect(scrollTo).toHaveBeenCalledWith({ top: 1000, behavior: "auto" });
  });

  it("scrolls down to a message we send, even while reading older ones", () => {
    const { container, rerender } = render(
      <Thread lastId="m1" isOwn={false} />,
    );
    scrollUp(container.firstElementChild as HTMLElement);
    scrollTo.mockReset();

    rerender(<Thread lastId="optimistic-1" isOwn />);
    expect(scrollTo).toHaveBeenCalledWith({ top: 1000, behavior: "smooth" });
  });

  it("follows a new reply when we're at the bottom", () => {
    const { rerender } = render(<Thread lastId="m1" isOwn={false} />);
    scrollTo.mockReset();
    rerender(<Thread lastId="m2" isOwn={false} />);
    expect(scrollTo).toHaveBeenCalledWith({ top: 1000, behavior: "smooth" });
  });

  it("leaves us where we are when a reply arrives while reading older ones", () => {
    const { container, rerender } = render(
      <Thread lastId="m1" isOwn={false} />,
    );
    scrollUp(container.firstElementChild as HTMLElement);
    scrollTo.mockReset();

    rerender(<Thread lastId="m2" isOwn={false} />);
    expect(scrollTo).not.toHaveBeenCalled();
  });
});
