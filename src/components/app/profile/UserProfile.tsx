import { User, UserRole } from "@/gql/graphql";
import { useDict } from "@/hooks/useDict";
import { useMe } from "@/hooks/useMe";
import Image from "next/image";
import { useProfileStore } from "@/components/app/profile/useProfileForm";
import { FormInput } from "./FormInput";
import NameIcon from "@/assets/icons/auth/name.svg";
import EmailIcon from "@/assets/icons/auth/email.svg";
import BankIcon from "@/assets/icons/auth/bank.svg";
import IbanIcon from "@/assets/icons/auth/iban.svg";
import AddressIcon from "@/assets/icons/address.svg";
import { FormPhoneInput } from "@/components/app/profile/FormInput";
import { PickLocation } from "@/components/app/auth/Register/PickLocation";
import { Button } from "@/components/ui/button";
import { useUpdateProfile } from "@/components/app/profile/useUpdateProfile";

export const UserProfile = () => {
  const { me } = useMe();
  const { form, updateInputField } = useProfileStore();
  const dict = useDict();
  const { updateProfile, updating } = useUpdateProfile();
  return (
    me && (
      <div className="grid auto-rows-max grid-cols-1 items-start justify-items-center gap-6 rounded-[16px] bg-white p-6">
        <ProfilePicture user={me} />
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
            />
            <Button
              variant={"secondary"}
              className="h-12.5 rounded-[20px] px-6 font-semibold"
            >
              {dict.profile.change}
            </Button>
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
            <Button
              variant={"secondary"}
              className="h-12.5 rounded-[20px] px-6 font-semibold"
            >
              {dict.profile.change}
            </Button>
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
          {me.role === UserRole.User && (
            <>
              <FormInput
                label={dict.profile.address}
                placeholder={dict.profile.address}
                value={form.input.address ?? ""}
                onChange={(v: string): void => {
                  updateInputField("address", v);
                }}
                icon={<AddressIcon className="size-4.5" />}
              />
              <PickLocation
                onChange={(lat, lng) => {
                  updateInputField("latitude", lat);
                  updateInputField("longitude", lng);
                }}
                latitude={form.input.latitude || undefined}
                longitude={form.input.longitude || undefined}
              />
            </>
          )}
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

const ProfilePicture = ({ user }: { user: User }) => {
  const dict = useDict();
  const { form, setAvatarFile } = useProfileStore();
  const url = form.avatarFile
    ? URL.createObjectURL(form.avatarFile)
    : user.avatarFilename
      ? `${process.env.NEXT_PUBLIC_DATA}/files/${user.avatarFilename}`
      : null;
  const { removeAvatar, removing } = useUpdateProfile();
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
          if (user.avatarFilename) {
            removeAvatar(user.id);
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
