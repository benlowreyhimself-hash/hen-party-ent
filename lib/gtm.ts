// Google Tag Manager helper functions

declare global {
  interface Window {
    dataLayer: any[];
  }
}

export const trackGTMEvent = (eventName: string, eventData?: Record<string, any>) => {
  if (typeof window !== "undefined" && window.dataLayer) {
    window.dataLayer.push({
      event: eventName,
      ...eventData,
    });
  }
};

// Specific event tracking functions
export const trackPhoneClick = (phoneNumber: string) => {
  trackGTMEvent("phone_click", {
    phone_number: phoneNumber,
    event_category: "Contact",
    event_label: "Phone Click",
  });
};

export const trackEmailClick = (email: string) => {
  trackGTMEvent("email_click", {
    email: email,
    event_category: "Contact",
    event_label: "Email Click",
  });
};

export const trackButtonClick = (buttonName: string, location?: string) => {
  trackGTMEvent("button_click", {
    button_name: buttonName,
    location: location || "unknown",
    event_category: "Engagement",
    event_label: buttonName,
  });
};

export const trackCallOptionClick = () => {
  trackGTMEvent("contact_call_option_clicked", {
    event_category: "Contact",
    event_label: "Call Option Clicked",
  });
};

export const trackEmailOptionClick = () => {
  trackGTMEvent("contact_email_option_clicked", {
    event_category: "Contact",
    event_label: "Email Option Clicked",
  });
};

export const trackTemplateRequest = (method: 'sms' | 'email' | 'whatsapp') => {
  trackGTMEvent("template_request", {
    method: method,
    event_category: "Contact",
    event_label: `Template Request - ${method.toUpperCase()}`,
  });
};

export const trackFormSubmission = (formData?: Record<string, any>) => {
  trackGTMEvent("form_submission", {
    ...formData,
    event_category: "Contact",
    event_label: "Contact Form Submitted",
  });
};

