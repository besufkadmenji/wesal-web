import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CityIcon from "@/assets/icons/city.svg";
import CategoryIcon from "@/assets/icons/category.bold.svg";
import { useRegisterStore } from "@/components/app/auth/Register/useRegisterStore";
import { useCities } from "@/hooks/useCities";
import { useDict } from "@/hooks/useDict";
import { useRegisterForm } from "@/hooks/useRegisterForm";
import { useLang } from "@/hooks/useLang";
import { useCategories } from "@/hooks/useCategories";
import RemoveIcon from "@/assets/icons/remove.svg";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Category } from "@/gql/graphql";
export const CitySelect = ({ error }: { error?: string }) => {
  const dict = useDict();
  const form = useRegisterStore((state) => state.formData);
  const updateField = useRegisterStore((state) => state.updateField);
  const { errors, handleFieldChange, showError } = useRegisterForm({
    form,
    updateField,
  });
  const { cities } = useCities();
  const lng = useLang();
  return (
    <div className="grid grid-cols-1 gap-1">
      <Select
        value={form.cityId || undefined}
        onValueChange={(value) => handleFieldChange("cityId", value)}
      >
        <SelectTrigger className="relative flex h-14! w-full rounded-[20px]! border-[#F2F2F2]! p-0! shadow-none! ring-0! ltr:pr-4! rtl:pl-4!">
          <CityIcon className="absolute right-auto left-4 size-4.5 text-[#999999] rtl:right-4 rtl:left-auto" />
          <span className="flex grow justify-start ltr:pl-10.5 rtl:pr-10.5">
            <SelectValue placeholder={dict.auth.signup.provider.city} />
          </span>
        </SelectTrigger>
        <SelectContent>
          {cities?.items.map((city) => (
            <SelectItem value={city.id} key={city.id}>
              {lng === "ar" ? city.nameAr : city.nameEn}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
};

export const CategorySelect = ({ error }: { error?: string }) => {
  const dict = useDict();
  const form = useRegisterStore((state) => state.formData);
  const updateField = useRegisterStore((state) => state.updateField);
  const { errors, handleFieldChange, showError } = useRegisterForm({
    form,
    updateField,
  });
  const { categories } = useCategories();
  const lng = useLang();
  return (
    <div className="grid grid-cols-1 gap-2.5">
      <div className="grid grid-cols-1 gap-1">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="relative h-14 rounded-[20px]! border border-[#F2F2F2]! p-0! shadow-none! ring-0! ltr:pr-4! rtl:pl-4!"
            >
              <CategoryIcon className="absolute right-auto left-4 size-4.5 text-[#999999] rtl:right-4 rtl:left-auto" />
              <span className="text-gray flex grow justify-start text-sm font-normal ltr:pl-10.5 rtl:pr-10.5">
                {dict.auth.signup.provider.category}
              </span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="max-h-[90vh] w-80 overflow-y-auto">
            <div className="grid grid-cols-1">
              {categories?.items.map((category) => (
                <div key={category.id} className="flex h-10 items-center gap-4">
                  <Checkbox
                    id={category.id}
                    checked={form.categoryIds?.includes(category.id)}
                    onCheckedChange={(v) => {
                      const selectedIds = form.categoryIds || [];
                      if (v) {
                        // Add category
                        handleFieldChange("categoryIds", [
                          ...selectedIds,
                          category.id,
                        ]);
                      } else {
                        // Remove category
                        handleFieldChange(
                          "categoryIds",
                          selectedIds.filter((id) => id !== category.id),
                        );
                      }
                    }}
                  />
                  <Label htmlFor={category.id}>
                    {lng === "ar" ? category.nameAr : category.nameEn}
                  </Label>
                </div>
              ))}
            </div>
          </PopoverContent>
        </Popover>
        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>
      <div className="flex flex-nowrap gap-2 overflow-x-auto pb-4">
        {form.categoryIds &&
          form.categoryIds.length > 0 &&
          categories?.items
            .filter((cat) => form.categoryIds?.includes(cat.id))
            .map((category) => (
              <SelectedCategory
                key={category.id}
                category={category}
                onRemove={(): void => {
                  const selectedIds = form.categoryIds || [];
                  handleFieldChange(
                    "categoryIds",
                    selectedIds.filter((id) => id !== category.id),
                  );
                }}
              />
            ))}
      </div>
    </div>
  );
};

const SelectedCategory = ({
  category,
  onRemove,
}: {
  category: Category;
  onRemove: () => void;
}) => {
  const lng = useLang();
  return (
    <div className="border-border flex gap-2 rounded-[20px] border px-2 py-1">
      <p className="text-xs font-normal text-black">
        {lng === "ar" ? category.nameAr : category.nameEn}
      </p>
      <RemoveIcon
        className="text-gray size-4 cursor-pointer"
        onClick={onRemove}
      />
    </div>
  );
};
