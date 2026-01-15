import { useContactFormStore } from "@/components/app/support/ContactUs/contactFormStore";
import { useDict } from "@/hooks/useDict";
import { validateContactForm, hasValidationErrors } from "@/utils/contact-form-validation";
import ContactMessageService from "@/services/contact.message.service";
import { uploadFile } from "@/utils/file.upload";
import { showErrorMessage, showSuccessMessage } from "@/utils/show.messages";
import { useState } from "react";

export const useSendMessage = () => {
  const [busy, setBusy] = useState(false);
  const dict = useDict();
  const { form, resetForm } = useContactFormStore();
  const setValidationErrors = useContactFormStore(
    (state) => state.setValidationErrors,
  );

  const sendMessage = async () => {
    // Validate form first with localized messages
    const errors = validateContactForm(form, dict);
    setValidationErrors(errors);

    if (hasValidationErrors(errors)) {
      showErrorMessage("Please fix the validation errors");
      return;
    }

    setBusy(true);
    try {
      const { image } = form;
      let filename;
      if (image) {
        const uploadResult = await uploadFile(image);
        if (uploadResult.url) {
          filename = uploadResult.filename;
        }
      }
      const result = await ContactMessageService.createContactMessage({
        email: form.email!,
        messageContent: form.messageContent!,
        messageType: form.messageType!,
        name: form.name!,
        phone: form.phoneNumber!,
        dialCode: form.countryCode!,
        attachmentFilename: filename,
      });
      if (result) {
        showSuccessMessage(dict.contactMessage.sendSuccessMessage);
        resetForm();
        setValidationErrors({});
      }
    } catch (error) {
      console.error("Send message error:", error);
      showErrorMessage(
        error instanceof Error
          ? error.message
          : dict.profile.updateProfileFailed,
      );
    } finally {
      setBusy(false);
    }
  };

  return {
    sendMessage,
    busy,
  };
};
