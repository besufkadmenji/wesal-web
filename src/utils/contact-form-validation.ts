import type { ContactForm } from "@/components/app/support/ContactUs/contactFormStore";
import type { Dictionary } from "@/config/i18n/types";

export interface ContactFormErrors {
  name?: string;
  phoneNumber?: string;
  email?: string;
  messageType?: string;
  messageContent?: string;
  image?: string;
}

export const validateContactForm = (
  form: ContactForm,
  dict: Dictionary,
): ContactFormErrors => {
  const errors: ContactFormErrors = {};

  // Name validation
  if (!form.name || form.name.trim().length === 0) {
    errors.name = dict.support.contactUs.validation.name.required;
  } else if (form.name.trim().length < 2) {
    errors.name = dict.support.contactUs.validation.name.minLength;
  } else if (form.name.trim().length > 50) {
    errors.name = dict.support.contactUs.validation.name.maxLength;
  }

  // Phone number validation
  if (!form.phoneNumber || form.phoneNumber.trim().length === 0) {
    errors.phoneNumber = dict.support.contactUs.validation.phoneNumber.required;
  } else if (form.phoneNumber.trim().length < 7) {
    errors.phoneNumber = dict.support.contactUs.validation.phoneNumber.invalid;
  } else if (form.phoneNumber.trim().length > 15) {
    errors.phoneNumber = dict.support.contactUs.validation.phoneNumber.invalid;
  }

  // Email validation
  if (!form.email || form.email.trim().length === 0) {
    errors.email = dict.support.contactUs.validation.email.required;
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      errors.email = dict.support.contactUs.validation.email.invalid;
    }
  }

  // Message type validation
  if (!form.messageType || form.messageType.trim().length === 0) {
    errors.messageType = dict.support.contactUs.validation.messageType.required;
  }

  // Message content validation
  if (!form.messageContent || form.messageContent.trim().length === 0) {
    errors.messageContent =
      dict.support.contactUs.validation.messageContent.required;
  } else if (form.messageContent.trim().length < 10) {
    errors.messageContent =
      dict.support.contactUs.validation.messageContent.minLength;
  } else if (form.messageContent.trim().length > 1000) {
    errors.messageContent =
      dict.support.contactUs.validation.messageContent.maxLength;
  }

  return errors;
};

export const hasValidationErrors = (errors: ContactFormErrors): boolean => {
  return Object.keys(errors).length > 0;
};
