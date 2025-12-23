import Image from "next/image";

export default function PhotosPage() {
  const photos = [
    {
      src: "https://henpartyentertainment.co.uk/wp-content/uploads/2014/11/1F93FF7F-70CA-4EF1-9584-D0F5C7BE91A8_1_201_a.jpeg",
      alt: "Hen Party Life Drawing Session",
    },
    {
      src: "https://henpartyentertainment.co.uk/wp-content/uploads/2020/04/0374AD0B-770A-4F85-B2AF-EC71E410CF05.png",
      alt: "Life Drawing Activity",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8 text-center">Photos</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {photos.map((photo, index) => (
          <div key={index} className="relative h-[300px] rounded-lg overflow-hidden group">
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        ))}
      </div>
      
      <div className="mt-12 text-center">
        <p className="text-muted-foreground">
          View full description on the{" "}
          <a href="/" className="text-primary hover:underline">homepage</a>
        </p>
      </div>
    </div>
  );
}

