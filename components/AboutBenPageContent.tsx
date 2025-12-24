"use client";

import Image from "next/image";
import ContactModule from "@/components/ContactModule";

export default function AboutBenPageContent() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8 text-center">About Ben</h1>

      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="relative h-[400px] rounded-lg overflow-hidden">
            <Image
              src="https://xirtgqglzsghphhihrcr.supabase.co/storage/v1/object/public/hen-party-media/originals/ben-bride-glasses.jpg"
              alt="Ben - Professional Life Drawing Model"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="text-2xl font-semibold mb-4">Professional Life Drawing Entertainment</h2>
            <p className="text-muted-foreground mb-4">
              Ben brings years of experience in providing professional life drawing entertainment for hen parties
              across the UK. With a passion for art and entertainment, Ben creates a fun, comfortable, and
              memorable experience for all participants.
            </p>
            <p className="text-muted-foreground mb-4">
              Specializing in hen party entertainment, Ben ensures that every session is tailored to the group,
              making it an unforgettable part of your celebration.
            </p>
            <p className="text-muted-foreground">
              Available nationwide, Ben travels to your location to provide this unique and entertaining activity
              for your special occasion.
            </p>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-8">
          <h3 className="text-xl font-semibold mb-4">Why Choose Ben?</h3>
          <ul className="space-y-3">
            <li className="flex items-start">
              <span className="text-primary mr-2">✓</span>
              <span className="text-foreground">Professional and experienced life drawing instructor</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">✓</span>
              <span className="text-foreground">Creates a comfortable and fun atmosphere</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">✓</span>
              <span className="text-foreground">All materials provided</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">✓</span>
              <span className="text-foreground">Nationwide availability</span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-2">✓</span>
              <span className="text-foreground">Tailored sessions for your group</span>
            </li>
          </ul>
        </div>

        {/* Contact Section */}
        <div className="mt-12">
          <h3 className="text-2xl font-semibold mb-6 text-center">Get in Touch</h3>
          <ContactModule variant="full" showFormLink={true} />
        </div>
      </div>
    </div>
  );
}

