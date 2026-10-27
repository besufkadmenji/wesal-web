import MarkerIcon from "@/assets/icons/marker.svg";
import { useDict } from "@/hooks/useDict";

export const AddressMarker = () => {
  const dict = useDict();
  return (
    <div className="relative z-40">
      <MarkerIcon className="w-11.5" />

      <p className="mt-1.5 text-xl font-medium text-white">
        {dict.support.contactUs.mapMarker}
      </p>
    </div>
  );
};
