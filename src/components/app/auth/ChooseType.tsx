"use client";
import { Wrapper } from "@/components/app/auth/Wrapper";
import { Button } from "@/components/ui/button";
import { useAppRouter } from '@/hooks/use.app.router';
import { useDict } from "@/hooks/useDict";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useQueryState } from "nuqs";
export const ChooseType = () => {
  const dict = useDict();
  const [type, setType] = useQueryState("type");
  const [action] = useQueryState("action", {
    defaultValue: "login",
  });
  const router = useAppRouter();
  return (
    <Wrapper>
      <div className="grid grid-cols-1 gap-60 px-15 py-10">
        <div className="grid grid-cols-1 gap-20">
          <div className="grid grid-cols-1 gap-3">
            <h1 className="text-center text-2xl font-semibold text-black">
              {dict.auth.choose.title}
            </h1>
            <p className="text-gray text-center text-lg leading-9">
              {dict.auth.choose.subtitle}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <ChooseCard
              image={"/images/user.auth.png"}
              label={dict.auth.choose.user}
              active={type === "user"}
              onClick={(): void => {
                setType("user");
              }}
            />
            <ChooseCard
              image={"/images/provider.auth.png"}
              label={dict.auth.choose.provider}
              active={type === "provider"}
              onClick={(): void => {
                setType("provider");
              }}
            />
          </div>
        </div>
        <Button
          className="h-12.5 rounded-[20px] text-base font-semibold"
          disabled={!action || !type}
          onClick={() => {
            router.push(`/auth/${action}?type=${type}`);
          }}
        >
          {dict.auth.choose.next}
        </Button>
      </div>
    </Wrapper>
  );
};

const ChooseCard = ({
  image,
  label,
  active,
  onClick,
}: {
  image: string;
  label: string;
  active: boolean;
  onClick: () => void;
}) => {
  return (
    <div
      className={cn(
        "grid cursor-pointer grid-cols-1 justify-items-center gap-5 rounded-[24px] border border-b-[3px] border-transparent p-2 duration-100 ease-in-out",
        active && "border-black",
      )}
      onClick={onClick}
    >
      <div className="relative aspect-216/134 w-full overflow-hidden rounded-2xl">
        <Image src={image} alt={label} fill className="object-cover" />
      </div>
      <p className="text-lg font-medium text-black">{label}</p>
    </div>
  );
};
