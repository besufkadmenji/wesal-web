import EmailIcon from "@/assets/icons/auth/email.svg";
import NameIcon from "@/assets/icons/auth/name.svg";
import MessageIcon from "@/assets/icons/support.message.svg";
import { useContactFormStore } from "@/components/app/support/ContactUs/contactFormStore";
import { useDict } from "@/hooks/useDict";
import { PhoneInput } from "../../shared/inputs/PhoneInput";
import { TextInput } from "../../shared/inputs/TextInput";
import { AppTextarea } from "@/components/app/shared/inputs/TextInput";
import { UploadImage } from "@/components/app/support/ContactUs/UploadImage";
import { Button } from "@/components/ui/button";
export const ContactForm = () => {
  const dict = useDict();
  const form = useContactFormStore((state) => state.form);
  const setForm = useContactFormStore((state) => state.setForm);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
      className="grid grid-cols-1 gap-5"
    >
      <TextInput
        icon={<NameIcon />}
        placeholder={dict.support.contactUs.form.name}
        value={form.name}
        onChange={(v) => setForm({ name: v })}
      />
      <PhoneInput
        value={form.phoneNumber}
        onChange={(phoneNumber) => setForm({ phoneNumber })}
      />
      <TextInput
        icon={<EmailIcon />}
        placeholder={dict.support.contactUs.form.email}
        value={form.email}
        onChange={(v) => setForm({ email: v })}
      />
      <TextInput
        icon={<MessageIcon />}
        placeholder={dict.support.contactUs.form.messageType}
        value={form.messageType}
        onChange={(v) => setForm({ messageType: v })}
      />
      <AppTextarea
        placeholder={dict.support.contactUs.form.messageContent}
        value={form.messageContent}
        onChange={(v) => setForm({ messageContent: v })}
      />
      <UploadImage
        file={form.image}
        onChange={(file) => setForm({ image: file })}
      />
      <Button className="mt-1 justify-self-center w-1/3 h-12.5 rounded-[20px]">{dict.support.contactUs.form.submit}</Button>
    </form>
  );
};
