"use client";
import { sar } from "@/assets/fonts/sar";
import DownIcon from "@/assets/icons/down.bold.svg";
import { useListing } from "@/components/app/my-listings/ListingDetail/useListing";
import { AppTextarea } from "@/components/app/my-listings/manage/FormInput";
import { FormRadio } from "@/components/app/my-listings/manage/FormRadio";
import {
  UploadImages,
  UploadVideo,
} from "@/components/app/my-listings/manage/UploadFile";
import { useManageForm } from "@/components/app/my-listings/manage/useForm";
import { useManageListing } from "@/components/app/my-listings/manage/useManageListing";
import { AppLoading } from "@/components/app/shared/AppLoading";
import { AppWrapper } from "@/components/app/shared/AppWrapper";
import { SupportPageType, Wrapper } from "@/components/app/support/Wrapper";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ListingType } from "@/gql/graphql";
import { useDict } from "@/hooks/useDict";
import { useLang } from "@/hooks/useLang";
import { useMe } from "@/hooks/useMe";
import { twMerge } from "tailwind-merge";
import { FormInput } from "./FormInput";
import { useFormValidation } from "./useFormValidation";

export const EditListing = () => {
  const dict = useDict();
  const lng = useLang();
  const { me } = useMe();
  const { listing, isLoading } = useListing();
  const { updateListing, updating } = useManageListing();
  const categories = me?.categories || [];
  const {
    form,
    setForm,
    photoFiles,
    setPhotoFiles,
    storyVideoFile,
    setStoryVideoFile,
  } = useManageForm(listing);
  const { errors, validateForm, clearError } = useFormValidation({
    ...form,
    photoFiles,
    storyVideoFile,
  });

  const handleSubmit = async () => {
    if (validateForm()) {
      await updateListing(listing!.id);
    }
  };
  console.log("errors", errors, listing);
  return !listing ? (
    <AppLoading className="h-[90vh]" />
  ) : (
    <AppWrapper>
      <Wrapper variant={SupportPageType.ADD_LISTING}>
        <div className="grid grid-cols-1 gap-20 rounded-[20px] px-[7vw] py-20">
          <div className="grid grid-cols-1 gap-5 bg-white p-6">
            <FormRadio
              label={dict.addListing.form.listingType}
              isRequired={true}
              value={form.type}
              onChange={(v: string): void => {
                setForm({ type: v as ListingType });
              }}
              options={[
                {
                  label: dict.addListing.form.freeListing,
                  value: ListingType.Free,
                },
                {
                  label: dict.addListing.form.featuredListing,
                  value: ListingType.Featured,
                  isDisabled: true,
                },
              ]}
            />
            <div className="grid grid-cols-3 gap-3">
              <FormInput
                label={dict.addListing.form.listingName}
                value={form.name ?? ""}
                onChange={(v: string): void => {
                  setForm({ name: v });
                  clearError("name");
                }}
                isRequired
                endContent={
                  <p className="text-sm font-normal text-[#999999]">
                    {(form.name ?? "").length}/50
                  </p>
                }
                maxLength={50}
                error={errors.name}
              />
              <FormInput
                label={dict.addListing.form.listingPrice}
                value={`${form.priceString ?? ""}`}
                onChange={(v: string): void => {
                  if (isNaN(Number(v))) return;
                  setForm({ priceString: v, price: Number(v) });
                  clearError("price");
                }}
                isRequired
                endContent={
                  <p
                    className={twMerge(
                      "text-sm font-normal text-[#22283A]",
                      sar.className,
                    )}
                  >
                    A
                  </p>
                }
                error={errors.price}
              />
              <div className="grid grid-cols-1 gap-1">
                <Select
                  dir={lng === "ar" ? "rtl" : "ltr"}
                  disabled={categories.length === 0}
                  value={form.categoryId || undefined}
                  onValueChange={(value) => {
                    setForm({ categoryId: value });
                    clearError("categoryId");
                  }}
                >
                  <SelectTrigger
                    className="flex h-14! w-full justify-start gap-2 rounded-[20px] bg-white px-4 shadow-none! ring-0!"
                    icon={<DownIcon className="size-3" />}
                  >
                    <div className="placeholder:text-gray flex grow justify-start text-sm leading-6">
                      <SelectValue
                        placeholder={dict.addListing.form.listingCategory}
                      />
                      <span className="text-[#B3251E]"> *</span>
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {lng === "ar" ? category.nameAr : category.nameEn}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.categoryId && (
                  <p className="text-sm text-red-500">{errors.categoryId}</p>
                )}
              </div>
            </div>
            <AppTextarea
              label={dict.addListing.form.listingDescription}
              value={form.description ?? ""}
              onChange={(v: string): void => {
                setForm({ description: v });
                clearError("description");
              }}
              isRequired
              endContent={
                <p className="text-sm font-normal text-[#999999]">
                  {(form.description ?? "").length}/500
                </p>
              }
              maxLength={500}
              error={errors.description}
            />
            <UploadImages
              files={photoFiles}
              onChange={(files) => {
                setPhotoFiles(files);
                clearError("photoFiles");
              }}
              placeholder={dict.addListing.form.listingImages}
              description={dict.addListing.form.maxImages}
              isRequired
              error={errors.photoFiles}
              urls={form.photos ?? []}
              onChangeUrls={(photos) =>
                setForm({
                  photos: photos,
                })
              }
            />
            <UploadVideo
              file={storyVideoFile}
              onChange={(file) => {
                setStoryVideoFile(file);
                clearError("storyVideoFile");
              }}
              placeholder={dict.addListing.form.listingVideo}
              error={errors.storyVideoFile}
              url={form.story ?? undefined}
              onChangeUrl={(url) =>
                setForm({
                  story: url || null,
                })
              }
            />
          </div>
          <Button
            className="h-12.5 justify-self-center rounded-[20px] px-20"
            onClick={handleSubmit}
            disabled={updating}
          >
            {dict.editListing.saveChanges}
          </Button>
        </div>
      </Wrapper>
    </AppWrapper>
  );
};
