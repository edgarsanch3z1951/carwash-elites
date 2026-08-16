export const BUSINESS = {
  name: "Carwash Elites",
  phone: "(805) 668-8107",
  phoneHref: "tel:+18056688107",
  instagram: "@carwash_elites",
  instagramUrl: "https://www.instagram.com/carwash_elites/",
  serviceArea: "Ventura County, CA",
} as const;

export const CITIES = [
  "Ventura",
  "Oxnard",
  "Camarillo",
  "Thousand Oaks",
  "Simi Valley",
  "Moorpark",
  "Fillmore",
  "Santa Paula",
  "Port Hueneme",
  "Ojai",
] as const;

export const VEHICLE_TYPES = [
  { key: "car", label: "Car" },
  { key: "truck", label: "Truck" },
  { key: "suv", label: "SUV" },
] as const;

export type VehicleType = (typeof VEHICLE_TYPES)[number]["key"];

export const PACKAGES = [
  {
    id: "exterior-refresh",
    name: "Exterior Refresh",
    pricing: { car: 35, truck: 45, suv: 40 },
    features: [
      "Hand wash & dry",
      "Tire shine & rim cleaning",
      "Wax application",
    ],
  },
  {
    id: "basic",
    name: "Basic Package",
    pricing: { car: 55, truck: 65, suv: 75 },
    features: [
      "Hand wash & dry",
      "Tire shine & rim cleaning",
      "Interior vacuum (floors & seats only)",
      "Wax application",
    ],
  },
  {
    id: "premium",
    name: "Premium Package",
    tagline: "The Ultimate Clean",
    pricing: { car: 85, truck: 95, suv: 105 },
    features: [
      "Black trim restoration",
      "Wax application",
      "Window cleaning (inside & out)",
      "Deep clean dashboard/console/door edge & crevices",
      "Interior vacuum (floors & seats)",
    ],
  },
  {
    id: "elite",
    name: "Elite Package",
    tagline: "The Ultimate Interior Care",
    pricing: { car: 120, truck: 120, suv: 140 },
    features: [
      "Leather deep clean + conditioning (moisturizes & protects from cracks)",
      "Deep clean extraction (cloth seats only)",
      "Wax application",
      "Window cleaning (inside & out)",
      "Deep clean dashboard/console/door edge & crevices",
      "Interior vacuum (floors & seats)",
    ],
    popular: true,
    note: "+ $20 Floor Deep Clean Extraction (add-on)",
  },
] as const;

export const ADD_ONS = [
  {
    id: "clay-bar",
    name: "Clay Bar Treatment",
    description: "Deep paint decontamination for a smooth finish",
    price: 40,
    image: "/claybar.PNG",
  },
  {
    id: "headlight-restoration",
    name: "Headlight Restoration",
    description: "Restore cloudy, yellowed headlights to crystal clarity",
    price: 60,
    before: "/headlightbefore.PNG",
    after: "/headlightafter.PNG",
  },
] as const;

export const GALLERY_ITEMS = [
  {
    id: 1,
    label: "Sedan Exterior",
    before: "/camaro1.jpg",
    after: "/camaro2.jpg",
  },
  {
    id: 2,
    label: "SUV Interior",
    before: "/lexus1.jpg",
    after: "/lexus2.jpg",
  },
  {
    id: 3,
    label: "Truck Detail",
    before: "/red1.jpg",
    after: "/red2.jpg",
  },
  {
    id: 4,
    label: "Luxury Finish",
    before: "/leather1.jpg",
    after: "/leather2.jpg",
  },
] as const;

export const TESTIMONIALS = [
  {
    id: 1,
    quote:
      "They came to my driveway in Ventura and left my truck looking brand new. Super professional and worth every penny.",
    name: "Marcus T.",
    location: "Ventura, CA",
  },
  {
    id: 2,
    quote:
      "Booked the Premium Package for my wife's SUV — the interior looks and smells amazing. Will definitely rebook.",
    name: "Sarah L.",
    location: "Camarillo, CA",
  },
  {
    id: 3,
    quote:
      "Best mobile detail in the county. On time, friendly, and the before/after on my car was night and day.",
    name: "David R.",
    location: "Thousand Oaks, CA",
  },
] as const;

export const BOOKING_SECTION_ID = "book";
export const HERO_SECTION_ID = "hero";
