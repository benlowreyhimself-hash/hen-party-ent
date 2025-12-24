"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface Photo {
  src: string;
  alt: string;
  title: string;
  description?: string;
}

// All photos from WordPress site - comprehensive list
// All photos recovered and hosted on Supabase
const PHOTO_BASE_URL = "https://xirtgqglzsghphhihrcr.supabase.co/storage/v1/object/public/hen-party-media/originals";

const allPhotos: Photo[] = [
  {
    src: `${PHOTO_BASE_URL}/hen-party-cozy-cottage-hen-party-c40t.jpeg`,
    alt: "Cozy Cottage Hen Party Life Drawing",
    title: "Relaxed Cottage Atmosphere",
    description: "Perfect for a cozy night in. We bring the entertainment to your cottage or home."
  },
  {
    src: `${PHOTO_BASE_URL}/hen-party-lifedrawing-torso-charcoal-sketch-2aqe.jpeg`,
    alt: "Artistic Charcoal Sketch Close Up",
    title: "Create Your Masterpiece",
    description: "No experience needed! We guide you through creating your own amazing drawings."
  },
  {
    src: `${PHOTO_BASE_URL}/hen-party-woman-holding-life-drawing-mg2e.jpg`,
    alt: "Bride showing off her life drawing",
    title: "Proud of the Results",
  },
  {
    src: `${PHOTO_BASE_URL}/hen-party-drawing-group-photo-fun-w03k.jpeg`,
    alt: "Hen Party Life Drawing Group Fun",
    title: "Group Fun",
  },
  {
    src: `${PHOTO_BASE_URL}/hen-party-group-photo-drawing-session-v275.jpeg`,
    alt: "Hen Party Life Drawing Group Session",
    title: "Memorable Group Photos",
  },
  {
    src: `${PHOTO_BASE_URL}/hen-party-drawing-session-close-up-v69m.jpeg`,
    alt: "Life Drawing Sketching",
    title: "Guided Sketching",
  },
  {
    src: `${PHOTO_BASE_URL}/hen-party-drawing-session-group-photo-l5z1.jpeg`,
    alt: "Hen Party Group Pose",
    title: "All Together Now",
  },
  {
    src: `${PHOTO_BASE_URL}/hen-party-group-photo-life-drawing-v0s9.jpeg`,
    alt: "Group Life Drawing Activity",
    title: "Fun for Everyone",
  },
  {
    src: `${PHOTO_BASE_URL}/hen-party-hen-party-life-drawing-t2dy.jpeg`,
    alt: "Life Drawing Session",
    title: "Instruction & Fun",
  },
  {
    src: `${PHOTO_BASE_URL}/hen-party-life-drawing-hen-party-6g84.jpeg`,
    alt: "Hen Party Entertainment",
    title: "Best Hen Party Activity",
  },
  {
    src: `${PHOTO_BASE_URL}/hen-party-lifedrawing-torso-censored-kny4.jpeg`,
    alt: "Life Drawing Model Pose",
    title: "Professional Modeling",
  },
  {
    src: `${PHOTO_BASE_URL}/ben-bride-glasses.jpg`,
    alt: "Ben - Professional Life Drawing Model",
    title: "Your Host Ben",
    description: "Professional, friendly, and experienced life drawing model and tutor."
  },
];

export default function PhotosPageContent() {
  const [photos, setPhotos] = useState<Photo[]>(allPhotos);
  const [loading, setLoading] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  // Optionally enrich photos with Gemini (can be done on-demand or batch)
  useEffect(() => {
    // Photos are pre-loaded with basic metadata
    // Gemini enrichment can be added later if needed via admin panel
    setPhotos(allPhotos);
  }, []);

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8 text-center">Photo Gallery</h1>
      <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
        Browse our collection of photos from hen party life drawing sessions across the UK.
        All sessions are professional, fun, and tailored to make your celebration memorable.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {photos.map((photo, index) => (
          <button
            key={index}
            type="button"
            className="relative h-[300px] rounded-lg overflow-hidden group cursor-pointer w-full"
            onClick={() => setSelectedPhoto(photo)}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-end">
              <div className="p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="font-semibold mb-1">{photo.title}</h3>
                {photo.description && (
                  <p className="text-sm opacity-90">{photo.description}</p>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Photo Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh] bg-white rounded-lg overflow-hidden">
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 z-10 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
            >
              ✕
            </button>
            <div className="relative h-[70vh]">
              <Image
                src={selectedPhoto.src}
                alt={selectedPhoto.alt}
                fill
                sizes="90vw"
                className="object-contain"
              />
            </div>
            <div className="p-6 bg-white">
              <h3 className="text-2xl font-semibold mb-2">{selectedPhoto.title}</h3>
              {selectedPhoto.description && (
                <p className="text-muted-foreground">{selectedPhoto.description}</p>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="mt-12 text-center">
        <p className="text-muted-foreground">
          All photos are from genuine hen party life drawing sessions.
          For more information, visit our{" "}
          <a href="/" className="text-primary hover:underline">homepage</a> or{" "}
          <a href="/contact" className="text-primary hover:underline">contact us</a>.
        </p>
      </div>
    </div>
  );
}

