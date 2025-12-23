"use client";

import { useState } from 'react';
import { Phone, Mail, FileText } from 'lucide-react';
import { trackCallOptionClick, trackButtonClick } from '@/lib/gtm';
import ContactLink from '@/components/ContactLink';
import TemplateRequest from './TemplateRequest';

export default function ContactOptions() {
  const [showTemplateModal, setShowTemplateModal] = useState(false);

  const handleCallClick = () => {
    trackCallOptionClick();
    setShowTemplateModal(true);
  };

  const handleEmailClick = () => {
    // GTM tracking is handled by ContactLink component
  };

  const handleFormClick = () => {
    trackButtonClick('Contact Form', 'Contact Options');
    window.location.href = '/contact#form';
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Option 1: Call Now */}
        <button
          onClick={handleCallClick}
          className="bg-primary text-primary-foreground p-6 rounded-lg hover:opacity-90 transition-opacity text-center group"
        >
          <Phone className="w-12 h-12 mx-auto mb-4 group-hover:scale-110 transition-transform" />
          <h3 className="text-xl font-bold mb-2">Call Now</h3>
          <p className="text-lg mb-2">07747571426</p>
          <p className="text-sm opacity-90">Click to call or request a template</p>
        </button>

        {/* Option 2: Email Directly */}
        <ContactLink
          type="email"
          value="ben@henpartyentertainment.co.uk"
          className="bg-secondary text-secondary-foreground p-6 rounded-lg hover:opacity-90 transition-opacity text-center group block no-underline"
        >
          <div className="flex flex-col items-center">
            <Mail className="w-12 h-12 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold mb-2">Email Directly</h3>
            <p className="text-sm opacity-90">Open your email client</p>
          </div>
        </ContactLink>

        {/* Option 3: Fill Out Form */}
        <button
          onClick={handleFormClick}
          className="bg-primary/80 text-primary-foreground p-6 rounded-lg hover:opacity-90 transition-opacity text-center group"
        >
          <FileText className="w-12 h-12 mx-auto mb-4 group-hover:scale-110 transition-transform" />
          <h3 className="text-xl font-bold mb-2">Fill Out Form</h3>
          <p className="text-sm opacity-90">Complete booking form online</p>
        </button>
      </div>

      {/* Template Request Modal */}
      {showTemplateModal && (
        <TemplateRequest
          onClose={() => setShowTemplateModal(false)}
        />
      )}
    </>
  );
}

