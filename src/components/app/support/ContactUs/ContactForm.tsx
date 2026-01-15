import EmailIcon from "@/assets/icons/auth/email.svg";
import NameIcon from "@/assets/icons/auth/name.svg";
import MessageIcon from "@/assets/icons/support.message.svg";
import { AppTextarea } from "@/components/app/shared/inputs/TextInput";
import { UploadImage } from "@/components/app/shared/UploadImage";
import { useContactFormStore } from "@/components/app/support/ContactUs/contactFormStore";
import { Button } from "@/components/ui/button";
import { useDict } from "@/hooks/useDict";
import { validateContactForm } from "@/utils/contact-form-validation";
import { PhoneInput } from "../../shared/inputs/PhoneInput";
import { TextInput } from "../../shared/inputs/TextInput";
import { useSendMessage } from "./useSendMessage";

export const ContactForm = () => {
  const dict = useDict();
  const form = useContactFormStore((state) => state.form);
  const setForm = useContactFormStore((state) => state.setForm);
  const validationErrors = useContactFormStore(
    (state) => state.validationErrors,
  );
  const setValidationErrors = useContactFormStore(
    (state) => state.setValidationErrors,
  );
  const { sendMessage, busy } = useSendMessage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form with localized messages
    const errors = validateContactForm(form, dict);
    setValidationErrors(errors);

    // If there are errors, don't submit
    if (Object.keys(errors).length > 0) {
      return;
    }

    // Submit form
    sendMessage();
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-5">
      <TextInput
        icon={<NameIcon />}
        placeholder={dict.support.contactUs.form.name}
        value={form.name}
        onChange={(v) => {
          setForm({ name: v });
          setValidationErrors({ ...validationErrors, name: undefined });
        }}
        error={validationErrors.name}
      />

      <PhoneInput
        value={form.phoneNumber}
        onChange={(phoneNumber) => {
          setForm({ phoneNumber });
          setValidationErrors({ ...validationErrors, phoneNumber: undefined });
        }}
        error={validationErrors.phoneNumber}
      />

      <TextInput
        icon={<EmailIcon />}
        placeholder={dict.support.contactUs.form.email}
        value={form.email}
        onChange={(v) => {
          setForm({ email: v });
          setValidationErrors({ ...validationErrors, email: undefined });
        }}
        error={validationErrors.email}
      />

      <TextInput
        icon={<MessageIcon />}
        placeholder={dict.support.contactUs.form.messageType}
        value={form.messageType}
        onChange={(v) => {
          setForm({ messageType: v });
          setValidationErrors({ ...validationErrors, messageType: undefined });
        }}
        error={validationErrors.messageType}
      />

      <div>
        <AppTextarea
          placeholder={dict.support.contactUs.form.messageContent}
          value={form.messageContent}
          onChange={(v) => {
            setForm({ messageContent: v });
            setValidationErrors({
              ...validationErrors,
              messageContent: undefined,
            });
          }}
        />
        {validationErrors.messageContent && (
          <p className="mt-1 text-xs text-red-500">
            {validationErrors.messageContent}
          </p>
        )}
      </div>

      <UploadImage
        file={form.image}
        onChange={(file) => setForm({ image: file })}
        placeholder={dict.support.contactUs.form.image}
        error={validationErrors.image}
      />

      <Button
        type="submit"
        disabled={busy}
        className="mt-1 h-12.5 w-1/3 justify-self-center rounded-[20px]"
      >
        {busy ? "Sending..." : dict.support.contactUs.form.submit}
      </Button>
    </form>
  );
};
