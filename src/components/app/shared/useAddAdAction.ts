import { useMe } from "@/hooks/useMe";
import { useRouter } from "next/navigation";
import { useQueryState } from "nuqs";

/**
 * What every "Add your ad" button does: a customer is offered to become a
 * provider (the BeProvider pop-up in the header); providers go to the
 * add-ad form, and visitors too (the proxy sends them to log in first).
 * Shared by the header, the mobile menu and the home Join section
 * (ClickUp 869fn0fft: that one had no action).
 */
export const useAddAdAction = () => {
  const { me } = useMe();
  const router = useRouter();
  const [, setBeProvider] = useQueryState("be-provider");
  return () => {
    if (me?.user) {
      setBeProvider("true");
    } else {
      router.push("/my-listings/add");
    }
  };
};
