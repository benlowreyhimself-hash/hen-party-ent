"use client";

import { useState, useEffect } from 'react';
import { X, Phone, Mail, MessageCircle } from 'lucide-react';
import { trackTemplateRequest, trackPhoneClick } from '@/lib/gtm';

interface TemplateRequestProps {
  onClose: () => void;
}

export default function TemplateRequest({ onClose }: TemplateRequestProps) {
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [selectedMethod, setSelectedMethod] = useState<'sms' | 'email' | 'call' | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [smsAvailable, setSmsAvailable] = useState(false);

  // Check if SMS is available on mount
  useEffect(() => {
    fetch('/api/contact/sms-available')
      .then(res => res.json())
      .then(data => setSmsAvailable(data.available))
      .catch(() => setSmsAvailable(false));
  }, []);

  const handleSMSRequest = async () => {
    if (!phone) {
      alert('Please enter your phone number');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/contact/template-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ method: 'sms', phone }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to send template');
      }

      trackTemplateRequest('sms');
      setSuccess(true);
      setTimeout(() => {
        onClose();
        setSuccess(false);
      }, 2000);
    } catch (error: any) {
      const errorMessage = error.message || 'Failed to send template';
      // If SMS is not available, suggest email instead
      if (errorMessage.includes('not available') || errorMessage.includes('not configured')) {
        alert('SMS is not available. Please use the email option instead.');
      } else {
        alert(`Error: ${errorMessage}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEmailRequest = async () => {
    if (!email) {
      alert('Please enter your email address');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/contact/template-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ method: 'email', email }),
      });

      if (!response.ok) throw new Error('Failed to send template');

      trackTemplateRequest('email');
      setSuccess(true);
      setTimeout(() => {
        onClose();
        setSuccess(false);
      }, 2000);
    } catch (error: any) {
      alert(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleJustCall = () => {
    trackPhoneClick('07747571426');
    window.location.href = 'tel:07747571426';
  };

  const handleWhatsApp = () => {
    trackTemplateRequest('whatsapp');
    // Open WhatsApp with the phone number (UK format: remove leading 0, add country code)
    const whatsappNumber = '447747571426'; // UK: +44 7747 571426
    window.open(`https://wa.me/${whatsappNumber}`, '_blank');
  };

  if (success) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg p-8 max-w-md w-full text-center">
          <div className="text-green-500 text-4xl mb-4">✓</div>
          <h3 className="text-2xl font-bold mb-2">Template Sent!</h3>
          <p className="text-foreground">Check your {selectedMethod === 'sms' ? 'phone' : 'email'} for the booking template.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-lg p-8 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Call: 07747571426</h2>
          <button
            onClick={onClose}
            className="text-foreground hover:text-primary transition-colors"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <p className="text-lg mb-6 text-center">
          Would you like us to send you a template to fill in?
        </p>

        <div className="space-y-4">
          {/* SMS Option - Only show if Twilio is configured */}
          {smsAvailable && (
            <div className="border border-border rounded-lg p-4">
              <div className="flex items-center gap-3 mb-3">
                <Phone className="w-6 h-6 text-primary" />
                <h3 className="font-semibold">Text me a template</h3>
              </div>
              <input
                type="tel"
                placeholder="Enter your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full border border-border rounded-md px-4 py-2 mb-3"
              />
              <button
                onClick={handleSMSRequest}
                disabled={loading || !phone}
                className="w-full bg-primary text-primary-foreground px-4 py-2 rounded-md hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {loading ? 'Sending...' : 'Send SMS Template'}
              </button>
            </div>
          )}

          {/* Email Option */}
          <div className="border border-border rounded-lg p-4">
            <div className="flex items-center gap-3 mb-3">
              <Mail className="w-6 h-6 text-primary" />
              <h3 className="font-semibold">Email me a template</h3>
            </div>
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-border rounded-md px-4 py-2 mb-3"
            />
            <button
              onClick={handleEmailRequest}
              disabled={loading || !email}
              className="w-full bg-primary text-primary-foreground px-4 py-2 rounded-md hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {loading ? 'Sending...' : 'Send Email Template'}
            </button>
          </div>

          {/* WhatsApp Option */}
          <div className="border border-border rounded-lg p-4">
            <div className="flex items-center gap-3 mb-3">
              <MessageCircle className="w-6 h-6 text-green-600" />
              <h3 className="font-semibold">WhatsApp</h3>
            </div>
            <button
              onClick={handleWhatsApp}
              className="w-full bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
            >
              Open WhatsApp
            </button>
          </div>

          {/* Just Call Option */}
          <button
            onClick={handleJustCall}
            className="w-full border-2 border-primary text-primary px-4 py-3 rounded-md hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            I'll just call
          </button>
        </div>
      </div>
    </div>
  );
}

