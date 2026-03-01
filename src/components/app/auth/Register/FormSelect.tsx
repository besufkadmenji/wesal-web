import CategoryIcon from "@/assets/icons/category.bold.svg";
import CityIcon from "@/assets/icons/city.svg";
import RemoveIcon from "@/assets/icons/remove.svg";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Category } from "@/gql/graphql";
import { useCategories } from "@/hooks/useCategories";
import { useCities } from "@/hooks/useCities";
import { useDict } from "@/hooks/useDict";
import { useLang } from "@/hooks/useLang";
export const CitySelect = ({
  value,
  onChange,
  error,
  label,
}: {
  value?: string;
  onChange: (value: string) => void;
  error?: string;
  label?: string;
}) => {
  const dict = useDict();
  const { cities } = useCities();
  const lng = useLang();
  return (
    <div className="relative grid grid-cols-1 gap-1">
      {label && (
        <Label className="text-gray absolute top-0 z-10 -translate-y-1/2 bg-white px-1 text-sm ltr:left-4 rtl:right-4">
          {label}
        </Label>
      )}
      <Select
        value={value || undefined}
        onValueChange={(value) => onChange?.(value)}
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

export const CategorySelect = ({
  value,
  onChange,
  error,
}: {
  value?: string[];
  onChange: (value: string[]) => void;
  error?: string;
}) => {
  const dict = useDict();
  const { categories } = useCategories({
    limit: 1000,
  });
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
          <PopoverContent className="w-80 p-0!">
            <div className="grid grid-cols-1 max-h-[60vh] p-4 overflow-y-scroll">
              {categories?.items.map((category) => (
                <div key={category.id} className="flex h-10 items-center gap-4">
                  <Checkbox
                    id={category.id}
                    checked={value?.includes(category.id)}
                    onCheckedChange={(v) => {
                      const selectedIds = value || [];
                      if (v) {
                        // Add category
                        onChange([...selectedIds, category.id]);
                      } else {
                        // Remove category
                        onChange(
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
      <div className="flex flex-wrap gap-2 overflow-x-auto pb-4 lg:flex-nowrap">
        {value &&
          value.length > 0 &&
          categories?.items
            .filter((cat) => value?.includes(cat.id))
            .map((category) => (
              <SelectedCategory
                key={category.id}
                category={category}
                onRemove={(): void => {
                  const selectedIds = value || [];
                  onChange(selectedIds.filter((id) => id !== category.id));
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
