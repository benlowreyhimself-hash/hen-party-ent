"use client";


import ContactForm from "@/components/ContactForm";
import ContactModule from "@/components/ContactModule";

export default function ContactPageContent() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8 text-center">Contact Ben</h1>

      <div className="max-w-4xl mx-auto">
        {/* Quick Contact Buttons */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-center">Get in Touch</h2>
          <ContactModule variant="full" showFormLink={true} />
        </div>



        {/* Full Booking Form */}
        <div id="form" className="scroll-mt-20">
          <h2 className="text-2xl font-semibold mb-6 text-center">Or fill out our booking form</h2>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}

