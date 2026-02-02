import BankIcon from "@/assets/icons/auth/bank.svg";
import EmailIcon from "@/assets/icons/auth/email.svg";
import IbanIcon from "@/assets/icons/auth/iban.svg";
import NameIcon from "@/assets/icons/auth/name.svg";
import { EmailChange } from "@/components/app/profile/ChangeEmail/EmailChange";
import { PhoneChange } from "@/components/app/profile/ChangePhone/PhoneChange";
import { FormPhoneInput } from "@/components/app/profile/FormInput";
import { useUpdateProviderProfile } from "@/components/app/profile/useUpdateProviderProfile";
import { Button } from "@/components/ui/button";
import { Provider } from "@/gql/graphql";
import { useDict } from "@/hooks/useDict";
import { useMe } from "@/hooks/useMe";
import Image from "next/image";
import { FormInput } from "./FormInput";
import { useProviderProfileStore } from "./useProviderProfileForm";

export const ProviderProfile = () => {
  const { me } = useMe();
  const { form, updateInputField } = useProviderProfileStore();
  const dict = useDict();
  const { updateProfile, updating } = useUpdateProviderProfile();
  return (
    me?.provider && (
      <div className="grid auto-rows-max grid-cols-1 items-start justify-items-center gap-6 rounded-[16px] bg-white p-6">
        <ProfilePicture provider={me.provider} />
        <div className="grid w-full grid-cols-1 gap-5">
          <FormInput
            label={dict.profile.name}
            placeholder={dict.profile.name}
            value={form.input.name ?? ""}
            onChange={(v: string): void => {
              updateInputField("name", v);
            }}
            icon={<NameIcon className="size-4.5" />}
          />
          <div className="grid grid-cols-[1fr_auto] items-center gap-3">
            <FormPhoneInput
              label={dict.profile.phone}
              value={form.input.phone ?? ""}
              onChange={(v: string): void => {
                updateInputField("phone", v);
              }}
              readOnly
              countryCode={form.input.dialCode || "+966"}
            />
            <PhoneChange>
              <Button
                variant={"secondary"}
                className="h-12.5 rounded-[20px] px-6 font-semibold"
              >
                {dict.profile.change}
              </Button>
            </PhoneChange>
          </div>
          <div className="grid grid-cols-[1fr_auto] items-center gap-3">
            <FormInput
              label={dict.profile.email}
              placeholder={dict.profile.email}
              value={form.input.email ?? ""}
              onChange={(v: string): void => {
                updateInputField("email", v);
              }}
              icon={<EmailIcon className="size-4.5" />}
              readOnly
            />
            <EmailChange>
              <Button
                variant={"secondary"}
                className="h-12.5 rounded-[20px] px-6 font-semibold"
              >
                {dict.profile.change}
              </Button>
            </EmailChange>
          </div>
          <FormInput
            label={dict.profile.bankName}
            placeholder={dict.profile.bankName}
            value={form.input.bankName ?? ""}
            onChange={(v: string): void => {
              updateInputField("bankName", v);
            }}
            icon={<BankIcon className="size-4.5" />}
          />
          <FormInput
            label={dict.profile.ibanNumber}
            placeholder={dict.profile.ibanNumber}
            value={form.input.ibanNumber ?? ""}
            onChange={(v: string): void => {
              updateInputField("ibanNumber", v);
            }}
            icon={<IbanIcon className="size-4.5" />}
          />

          <Button
            className="mt-5 h-12.5 justify-self-center rounded-[20px] px-20"
            disabled={updating}
            onClick={() => {
              updateProfile();
            }}
          >
            {dict.profile.saveChanges}
          </Button>
        </div>
      </div>
    )
  );
};

const ProfilePicture = ({ provider }: { provider: Provider }) => {
  const dict = useDict();
  const { form, setAvatarFile } = useProviderProfileStore();
  const url = form.avatarFile
    ? URL.createObjectURL(form.avatarFile)
    : provider.avatarFilename
      ? `${process.env.NEXT_PUBLIC_DATA}/files/${provider.avatarFilename}`
      : null;
  const { removeAvatar, removing } = useUpdateProviderProfile();
  return (
    <div className="grid grid-cols-1 justify-items-center gap-3">
      <label className="bg-border relative size-16 overflow-hidden rounded-full">
        {url && <Image src={url} alt="Avatar" fill className="object-cover" />}
        <input
          hidden
          type="file"
          accept="image/png, image/jpeg, image/jpg"
          onChange={(e) => {
            const files = e.target.files;
            if (files && files.length > 0) {
              setAvatarFile(files[0]);
            }
          }}
        />
      </label>
      <button
        className="font-semibold text-[#B3251E] disabled:opacity-50"
        disabled={!url || removing}
        onClick={() => {
          if (provider.avatarFilename) {
            removeAvatar(provider.id);
          } else if (form.avatarFile) {
            setAvatarFile(null);
          }
        }}
      >
        {dict.profile.deletePhoto}
      </button>
    </div>
  );
};
