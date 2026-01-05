"use client";
import AddressIcon from "@/assets/icons/address.svg";
import {
  CategorySelect,
  CitySelect,
} from "@/components/app/auth/Register/FormSelect";
import { PickLocation } from "@/components/app/auth/Register/PickLocation";
import { useProfileStore } from "@/components/app/profile/useProfileForm";
import { useUpdateProfile } from "@/components/app/profile/useUpdateProfile";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useDict } from "@/hooks/useDict";
import { useMe } from "@/hooks/useMe";
import { useEffect } from "react";
import { FormInput } from "./FormInput";

export const BusinessProfile = () => {
  const { me } = useMe();
  const { setInitialData } = useProfileStore();

  useEffect(() => {
    if (me) {
      setInitialData({
        input: {
          id: me.id,
          address: me.address || "",
          latitude: me.latitude || undefined,
          longitude: me.longitude || undefined,
          withAbsher: me.withAbsher || false,
          cityId: me.cityId || "",
          categoryIds: (me.categories || []).map((cat) => cat.id),
          commercialRegistrationNumber:
            me.commercialRegistrationNumber || undefined,
        },
      });
    }

    return () => {};
  }, [me, setInitialData]);
  return me && <ProviderForm />;
};

export const ProviderForm = () => {
  const { me } = useMe();
  const { form, updateInputField } = useProfileStore();
  const dict = useDict();
  const { updateBusinessProfile, updating } = useUpdateProfile();
  console.log("ProviderForm rendered");

  return (
    <div className="grid grid-cols-1 gap-5">
      <CitySelect
        value={form.input.cityId || ""}
        onChange={(value) => updateInputField("cityId", value)}
        label={dict.auth.signup.provider.city}
      />
      <FormInput
        label={dict.auth.signup.provider.address}
        icon={<AddressIcon className="size-4" />}
        placeholder={dict.auth.signup.provider.address}
        value={form.input.address || ""}
        onChange={(value) => updateInputField("address", value)}
      />
      <PickLocation
        onChange={(lat, lng) => {
          updateInputField("latitude", lat);
          updateInputField("longitude", lng);
        }}
        latitude={form.input.latitude || undefined}
        longitude={form.input.longitude || undefined}
      />
      <CategorySelect
        value={form.input.categoryIds || []}
        onChange={(value) => updateInputField("categoryIds", value)}
      />

      <div className="grid grid-cols-1 gap-2 rounded-[16px] border border-[#F2F2F2] bg-[#FBFBFB] p-4">
        <div className="flex items-center gap-2">
          <Checkbox
            id="verifyWithAbsher"
            checked={form.input.withAbsher || false}
            onCheckedChange={(checked) =>
              updateInputField("withAbsher", Boolean(checked))
            }
            className="size-4.5 border-2 border-[#999999] shadow-none ring-0!"
          />
          <div className="flex items-center gap-1">
            <Label
              htmlFor="verifyWithAbsher"
              className="text-base font-medium text-black"
            >
              {dict.auth.signup.provider.verifyWithAbsher}
            </Label>
            <p className="text-gray text-xs font-normal">
              {dict.auth.signup.provider.verifyWithAbsherOptional}
            </p>
          </div>
        </div>
        <p className="text-gray text-base leading-7 font-normal">
          {dict.auth.signup.provider.verifyWithAbsherDescription}
        </p>
      </div>
      <FormInput
        label={dict.profile.commercialRecordNumber}
        icon={<AddressIcon className="size-4" />}
        placeholder={dict.profile.commercialRecordNumber}
        value={form.input.commercialRegistrationNumber || ""}
        onChange={(value) =>
          updateInputField("commercialRegistrationNumber", value)
        }
      />
      <Button
        className="mt-5 h-12.5 justify-self-center rounded-[20px] px-20"
        disabled={updating}
        onClick={() => {
          updateBusinessProfile();
        }}
      >
        {dict.profile.saveChanges}
      </Button>
    </div>
  );
};
