export interface House {
  slug: string;
  title: string;
  location: string;
  address?: string;
  description: string;
  content: string;
  image?: string;
  features?: string[];
  seoTitle?: string;
  seoDescription?: string;
}

export const houses: House[] = [
  {
    slug: "church-farm-barn",
    title: "Church Farm Barn",
    location: "Cotswolds",
    description: "Beautiful barn venue perfect for hen party celebrations with life drawing entertainment.",
    content: `
      <p>Church Farm Barn is a stunning venue located in the heart of the Cotswolds, offering the perfect setting for your hen party celebration. This beautiful converted barn provides a unique and memorable space for life drawing sessions.</p>
      
      <p>With its rustic charm and spacious interior, Church Farm Barn can accommodate groups of various sizes. The venue features:</p>
      
      <ul>
        <li>Large open space perfect for life drawing sessions</li>
        <li>Beautiful natural lighting</li>
        <li>Comfortable seating arrangements</li>
        <li>Easy access and parking</li>
        <li>Close to local amenities</li>
      </ul>
      
      <p>We've provided life drawing entertainment at Church Farm Barn for numerous hen parties, creating unforgettable experiences for groups celebrating their special occasions. The venue's atmosphere perfectly complements our professional life drawing sessions.</p>
      
      <p>If you're planning a hen party at Church Farm Barn and would like to include life drawing entertainment, please contact us to discuss your requirements and availability.</p>
    `,
    features: [
      "Large open space",
      "Natural lighting",
      "Comfortable seating",
      "Parking available",
      "Cotswolds location"
    ],
    seoTitle: "Hen Party Life Drawing at Church Farm Barn, Cotswolds",
    seoDescription: "Professional life drawing entertainment for hen parties at Church Farm Barn in the Cotswolds. Create memorable celebrations with our unique life drawing sessions."
  },
  {
    slug: "forest-holiday",
    title: "Forest Holiday Hen Party Activity Life Drawing Nude Model – Forest of Dean",
    location: "Forest of Dean",
    description: "Hen party life drawing entertainment in the beautiful Forest of Dean area.",
    content: `
      <p>The Forest of Dean provides a stunning backdrop for hen party celebrations, and we're delighted to offer our life drawing entertainment services in this beautiful area.</p>
      
      <p>Forest Holiday venues in the Forest of Dean are perfect for groups looking for a unique and memorable hen party experience. Our life drawing sessions can be arranged at various locations throughout the area, bringing entertainment directly to your accommodation.</p>
      
      <p>What makes our Forest of Dean service special:</p>
      
      <ul>
        <li>Travel to your accommodation included</li>
        <li>Flexible session times to fit your schedule</li>
        <li>All materials provided</li>
        <li>Professional and experienced instructor</li>
        <li>Perfect for groups staying in holiday cottages or lodges</li>
      </ul>
      
      <p>Whether you're staying in a holiday cottage, lodge, or other accommodation in the Forest of Dean, we can bring our life drawing entertainment to you. Our sessions are designed to be fun, comfortable, and memorable for all participants.</p>
      
      <p>Contact us to book life drawing entertainment for your Forest of Dean hen party celebration.</p>
    `,
    features: [
      "Travel to accommodation included",
      "Flexible scheduling",
      "All materials provided",
      "Forest of Dean location",
      "Holiday cottage friendly"
    ],
    seoTitle: "Hen Party Life Drawing in Forest of Dean - Nude Model Entertainment",
    seoDescription: "Professional hen party life drawing entertainment in the Forest of Dean. We travel to your holiday accommodation for memorable life drawing sessions."
  },
  {
    slug: "cotswold-manor",
    title: "Hen Party Activities & Entertainment at Cotswold Manor Estate, Lew Bampton, Oxfordshire, OX18 2B",
    location: "Lew Bampton, Oxfordshire",
    address: "Cotswold Manor Estate, Lew Bampton, Oxfordshire, OX18 2B",
    description: "Luxury manor estate venue for hen party celebrations with life drawing entertainment.",
    content: `
      <p>Cotswold Manor Estate in Lew Bampton, Oxfordshire, is a prestigious venue offering luxury accommodation and facilities perfect for hen party celebrations. This stunning manor estate provides an elegant setting for our life drawing entertainment sessions.</p>
      
      <p>The estate features:</p>
      
      <ul>
        <li>Luxury accommodation for large groups</li>
        <li>Elegant reception rooms perfect for activities</li>
        <li>Beautiful grounds and gardens</li>
        <li>Professional facilities</li>
        <li>Exclusive use options available</li>
      </ul>
      
      <p>We've provided life drawing entertainment at Cotswold Manor Estate for numerous hen parties, creating sophisticated and memorable experiences. The venue's elegant atmosphere perfectly complements our professional life drawing sessions.</p>
      
      <p>Our life drawing sessions at Cotswold Manor Estate are tailored to your group, ensuring everyone feels comfortable and has a fantastic time. We provide all materials and can work around your schedule to fit with other activities you have planned.</p>
      
      <p>If you're planning a hen party at Cotswold Manor Estate and would like to include life drawing entertainment, please contact us to discuss your requirements.</p>
    `,
    features: [
      "Luxury venue",
      "Elegant reception rooms",
      "Beautiful grounds",
      "Large group accommodation",
      "Exclusive use available"
    ],
    seoTitle: "Hen Party Life Drawing at Cotswold Manor Estate, Lew Bampton, Oxfordshire",
    seoDescription: "Professional life drawing entertainment for hen parties at Cotswold Manor Estate in Lew Bampton, Oxfordshire. Luxury venue with elegant facilities."
  },
  {
    slug: "georgian-farm-house",
    title: "Fun Hen Party Activities near Bath. Georgian Farm House and Cottages, Frome Rd, BA14.",
    location: "Near Bath",
    address: "Georgian Farm House and Cottages, Frome Rd, BA14",
    description: "Georgian farmhouse and cottages near Bath perfect for hen party celebrations.",
    content: `
      <p>Located near Bath on Frome Road, this beautiful Georgian Farm House and Cottages provide an idyllic setting for hen party celebrations. The property offers both a main farmhouse and separate cottages, perfect for accommodating groups of various sizes.</p>
      
      <p>This venue is ideal for hen parties because:</p>
      
      <ul>
        <li>Beautiful Georgian architecture</li>
        <li>Spacious farmhouse with character</li>
        <li>Separate cottages for privacy</li>
        <li>Close to Bath city centre</li>
        <li>Perfect for group activities</li>
        <li>Beautiful countryside setting</li>
      </ul>
      
      <p>We've provided life drawing entertainment at this Georgian Farm House for many hen parties. The venue's character and charm create a wonderful atmosphere for our sessions, and the spacious rooms provide plenty of room for everyone to participate comfortably.</p>
      
      <p>Our life drawing sessions can be arranged in the main farmhouse or in one of the cottages, depending on your group's preference. We bring all materials and can work around your schedule to ensure the session fits perfectly with your celebration plans.</p>
      
      <p>If you're planning a hen party at this Georgian Farm House near Bath and would like to include life drawing entertainment, please contact us to discuss availability and pricing.</p>
    `,
    features: [
      "Georgian architecture",
      "Spacious farmhouse",
      "Separate cottages",
      "Near Bath city centre",
      "Countryside setting"
    ],
    seoTitle: "Hen Party Life Drawing near Bath - Georgian Farm House, Frome Rd BA14",
    seoDescription: "Professional life drawing entertainment for hen parties at Georgian Farm House and Cottages near Bath. Beautiful venue on Frome Road, BA14."
  },
  {
    slug: "petite-france",
    title: "Hen Party Activities – Petite France – Bodkin House Hotel",
    location: "Petite France",
    description: "Hen party life drawing entertainment at Bodkin House Hotel in Petite France.",
    content: `
      <p>Bodkin House Hotel in Petite France is a charming venue that provides an elegant setting for hen party celebrations. This beautiful hotel offers comfortable accommodation and facilities perfect for hosting life drawing entertainment sessions.</p>
      
      <p>The hotel features:</p>
      
      <ul>
        <li>Elegant hotel accommodation</li>
        <li>Function rooms suitable for activities</li>
        <li>Beautiful location in Petite France</li>
        <li>Professional service</li>
        <li>Group booking options</li>
      </ul>
      
      <p>We've provided life drawing entertainment at Bodkin House Hotel for several hen parties, creating memorable experiences in this beautiful location. The hotel's elegant atmosphere and professional facilities make it an ideal venue for our life drawing sessions.</p>
      
      <p>Our life drawing sessions at Bodkin House Hotel are designed to be fun, comfortable, and memorable. We can arrange sessions in one of the hotel's function rooms or in a private area, depending on your group's needs and preferences.</p>
      
      <p>If you're planning a hen party at Bodkin House Hotel in Petite France and would like to include life drawing entertainment, please contact us to discuss your requirements and check availability.</p>
    `,
    features: [
      "Elegant hotel venue",
      "Function rooms available",
      "Beautiful Petite France location",
      "Group booking options",
      "Professional facilities"
    ],
    seoTitle: "Hen Party Life Drawing at Bodkin House Hotel, Petite France",
    seoDescription: "Professional life drawing entertainment for hen parties at Bodkin House Hotel in Petite France. Elegant venue with function rooms perfect for activities."
  },
  {
    slug: "church-farm-barns-stratford",
    title: "Church Farm Barns, Church Lane, Shottery, Stratford-upon-Avon CV37 9HQ",
    location: "Stratford-upon-Avon",
    address: "Church Farm Barns, Church Lane, Shottery, Stratford-upon-Avon CV37 9HQ",
    description: "5-star Self Catering accommodation in Stratford-upon-Avon. Rooms in 2 houses with gardens, free parking and superb countryside views.",
    content: `
      <p>Church Farm Barns have a 5-star Self Catering rating. Rooms are in 2 houses, with gardens, free parking and superb countryside views.</p>
      
      <p>The Church Farm houses are 1 mile (1.6 km) from the centre of Stratford-upon-Avon.</p>
      
      <p>All rooms have free Wi-Fi access. The VisitBritain Gold Award is for "exceptional quality of accommodation and customer service".</p>
      
      <p>Church Farm Barns are very close to the famous Anne Hathaway's cottage. Anne was the wife of William Shakespeare.</p>
      
      <p>We've provided life drawing entertainment at Church Farm Barns for numerous hen parties, creating unforgettable experiences in this historic location. The venue's beautiful accommodation and gardens make it ideal for our life drawing sessions.</p>
      
      <p>Our life drawing sessions at Church Farm Barns are tailored to your group, ensuring everyone feels comfortable and has a fantastic time. We provide all materials and can work around your schedule to fit with other activities you have planned during your stay.</p>
      
      <p>If you're planning a hen party at Church Farm Barns in Stratford-upon-Avon and would like to include life drawing entertainment, please contact us to discuss your requirements and check availability.</p>
    `,
    features: [
      "5-star Self Catering rating",
      "Rooms in 2 houses",
      "Gardens and free parking",
      "Superb countryside views",
      "Free Wi-Fi access",
      "VisitBritain Gold Award",
      "1 mile from Stratford-upon-Avon centre",
      "Close to Anne Hathaway's cottage"
    ],
    seoTitle: "Hen Party Life Drawing at Church Farm Barns, Stratford-upon-Avon CV37 9HQ",
    seoDescription: "Professional life drawing entertainment for hen parties at Church Farm Barns in Shottery, Stratford-upon-Avon. Beautiful converted barns perfect for celebrations."
  }
];

export function getHouseBySlug(slug: string): House | undefined {
  return houses.find(house => house.slug === slug);
}

export function getAllHouseSlugs(): string[] {
  return houses.map(house => house.slug);
}

