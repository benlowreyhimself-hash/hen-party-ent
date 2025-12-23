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
const allPhotos: Photo[] = [
  {
    src: "https://henpartyentertainment.co.uk/wp-content/uploads/2014/11/1F93FF7F-70CA-4EF1-9584-D0F5C7BE91A8_1_201_a.jpeg",
    alt: "Hen Party Life Drawing Hero Session",
    title: "Welcome to Hen Party Life Drawing",
  },
  {
    src: "https://i0.wp.com/henpartyentertainment.co.uk/wp-content/uploads/2017/07/C3CD1C3E-99D3-4572-BB39-06D19DA36311_1_201_a-1.jpeg",
    alt: "Hen Party Life Drawing Session Activity",
    title: "Life Drawing Session in Progress",
  },
  {
    src: "https://i0.wp.com/henpartyentertainment.co.uk/wp-content/uploads/2019/11/BA76C206-80F2-421E-9E80-8C8F097EB5D3_1_201_a.jpeg?w=1080&ssl=1",
    alt: "Hen Party Life Drawing Group Session",
    title: "Group Life Drawing Activity",
  },
  {
    src: "https://i0.wp.com/henpartyentertainment.co.uk/wp-content/uploads/2020/04/Life-Drawing-Best-9-of-98-scaled.jpg?w=1080&ssl=1",
    alt: "Life Drawing Best Moments Collection",
    title: "Best Life Drawing Moments",
  },
  {
    src: "https://i0.wp.com/henpartyentertainment.co.uk/wp-content/uploads/2020/04/84101C19-5C36-45B8-94AB-BF1A10F610D3_1_105_c.jpg?w=1080&ssl=1",
    alt: "Hen Party Life Drawing Fun Session",
    title: "Fun Life Drawing Session",
  },
  {
    src: "https://i0.wp.com/henpartyentertainment.co.uk/wp-content/uploads/2019/11/FAAF3DB4-EF12-4CBE-93FC-8FD1B370CAC2_1_201_a.jpeg?w=1080&ssl=1",
    alt: "Hen Party Life Drawing Entertainment",
    title: "Professional Life Drawing Entertainment",
  },
  {
    src: "https://i0.wp.com/henpartyentertainment.co.uk/wp-content/uploads/2019/11/87949746-ADB1-4F80-AFD0-CB87E0FA3C43_1_201_a.jpeg?w=1080&ssl=1",
    alt: "Hen Party Life Drawing Activity",
    title: "Hen Party Life Drawing Activity",
  },
  {
    src: "https://i0.wp.com/henpartyentertainment.co.uk/wp-content/uploads/2019/04/889ECDED-497A-4DD6-ADAD-94CBD586BE38_1_201_a.jpeg?resize=768%2C432&ssl=1",
    alt: "Hen Party Life Drawing Session",
    title: "Life Drawing Session",
  },
  {
    src: "https://i0.wp.com/henpartyentertainment.co.uk/wp-content/uploads/2018/05/09DAEC5B-3577-4FE9-B3D6-505A41109D06_1_201_a.jpeg?w=1080&ssl=1",
    alt: "Hen Party Life Drawing Entertainment",
    title: "Hen Party Entertainment",
  },
  {
    src: "https://i0.wp.com/henpartyentertainment.co.uk/wp-content/uploads/2019/04/0C8D2E1F-D9CF-424C-8ED7-75C1B0620F25_1_201_a.jpeg?w=1080&ssl=1",
    alt: "Hen Party Life Drawing Session",
    title: "Life Drawing Session",
  },
  {
    src: "https://i0.wp.com/henpartyentertainment.co.uk/wp-content/uploads/2020/04/C6378496-36A9-456D-A09E-3FCB984617A4-scaled.jpg?w=1080&ssl=1",
    alt: "Hen Party Life Drawing Activity",
    title: "Hen Party Life Drawing Activity",
  },
  {
    src: "https://i0.wp.com/henpartyentertainment.co.uk/wp-content/uploads/2019/04/4F717ECF-E6BA-4EDB-838B-78AAB830FB96_1_201_a.jpeg?w=1080&ssl=1",
    alt: "Hen Party Life Drawing Session",
    title: "Life Drawing Session",
  },
  {
    src: "https://i0.wp.com/henpartyentertainment.co.uk/wp-content/uploads/2018/08/CF76E7FD-4AFB-44AF-BD1B-59AA5DB8871C_1_201_a.jpeg?w=1080&ssl=1",
    alt: "Hen Party Life Drawing Entertainment",
    title: "Hen Party Entertainment",
  },
  {
    src: "https://i0.wp.com/henpartyentertainment.co.uk/wp-content/uploads/2019/04/CCF9FF36-C49D-4AE9-9C90-77F46E85CBEE_1_201_a.jpeg?resize=768%2C432&ssl=1",
    alt: "Hen Party Life Drawing Session",
    title: "Life Drawing Session",
  },
  {
    src: "https://henpartyentertainment.co.uk/wp-content/uploads/2020/04/0374AD0B-770A-4F85-B2AF-EC71E410CF05.png",
    alt: "Ben - Professional Life Drawing Model",
    title: "About Ben - Professional Model",
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

