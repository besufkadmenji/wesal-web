import ChatEmptyIcon from "@/assets/icons/chat.empty.svg";
import { useDict } from "@/hooks/useDict";

export const NoConversationSelected = () => {
  const dict = useDict();
  return (
    <div className="grid h-full auto-rows-max grid-cols-1 content-center justify-center justify-items-center gap-8 rounded-2xl bg-white p-6">
      <ChatEmptyIcon className="size-44 shrink-0" aria-hidden />
      <div className="grid max-w-2xl justify-items-center gap-3 text-center">
        <h2 className="text-2xl leading-10 font-semibold text-black">
          {dict.conversations.select}
        </h2>
        <p className="text-gray text-lg leading-9">
          {dict.conversations.selectDescription}
        </p>
      </div>
    </div>
  );
};
