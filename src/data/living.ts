// Fictional catalogue and property attributes for the interactive preview.
export const homeProfile = {
  bedrooms: 2,
  squareMetres: 85,
  airConditioners: 3,
};
export type Package = {
  id: string;
  name: string;
  description: string;
  price: number;
  unit: string;
  saving?: number;
};
export type Service = {
  id: string;
  name: string;
  description: string;
  basis: string;
  packages: Package[];
};
export const homeServices: Service[] = [
  {
    id: "housekeeping",
    name: "Housekeeping",
    description:
      "A fresh, clean home without the extra work. Cleaning supplies included.",
    basis: `${homeProfile.bedrooms} bedrooms · ${homeProfile.squareMetres} m²`,
    packages: [
      {
        id: "standard",
        name: "Standard clean",
        description: "Floors, surfaces, bathrooms and kitchen. One visit.",
        price: homeProfile.squareMetres * 15,
        unit: "/ visit",
      },
      {
        id: "deep",
        name: "Deep clean",
        description:
          "A thorough clean including detailed kitchen and bathroom care.",
        price: homeProfile.squareMetres * 30,
        unit: "/ visit",
      },
      {
        id: "weekly",
        name: "Weekly care",
        description:
          "Four standard cleaning visits to keep your home feeling fresh.",
        price: homeProfile.squareMetres * 15 * 4 * 0.9,
        unit: "/ 4 visits",
      },
    ],
  },
  {
    id: "laundry",
    name: "Laundry",
    description:
      "Wash, dry and fold with collection and delivery at your building.",
    basis: "Collection & delivery at The Lofts Asoke · Unit 1804",
    packages: [
      {
        id: "small",
        name: "Everyday bag",
        description:
          "Up to 5 kg of everyday laundry. Collection and return included.",
        price: 350,
        unit: "/ bag",
      },
      {
        id: "large",
        name: "Family bag",
        description:
          "Up to 10 kg of everyday laundry. Collection and return included.",
        price: 650,
        unit: "/ bag",
      },
    ],
  },
  {
    id: "aircon",
    name: "Air conditioner cleaning",
    description:
      "Routine cleaning to help your air conditioners run smoothly. Repairs are handled through Maintenance.",
    basis: `${homeProfile.airConditioners} air conditioners in your home`,
    packages: [
      {
        id: "standard",
        name: "Clean every unit",
        description:
          "Filter, coil and drainage cleaning for all your air conditioners.",
        price: homeProfile.airConditioners * 650,
        unit: "/ visit",
      },
      {
        id: "care",
        name: "Twice-yearly care",
        description:
          "Two cleaning visits, each covering every air conditioner in your home.",
        price: homeProfile.airConditioners * 600 * 2,
        unit: "/ 2 visits",
      },
    ],
  },
];
export const internet: Service = {
  id: "internet",
  name: "AIS internet",
  description:
    "Your modem is already in the unit. Choose a plan for immediate activation, with no technician appointment.",
  basis: "Existing modem · Unit 1804 · No installation visit",
  packages: [
    {
      id: "everyday",
      name: "Everyday",
      description:
        "300 / 300 Mbps · Ideal for browsing, video calls and streaming.",
      price: 399,
      unit: "/ month",
    },
    {
      id: "plus",
      name: "Home Plus",
      description:
        "500 / 500 Mbps · More room for multiple devices and working from home.",
      price: 499,
      unit: "/ month",
    },
    {
      id: "max",
      name: "Home Max",
      description: "1,000 / 500 Mbps · Extra speed for busy, connected homes.",
      price: 699,
      unit: "/ month",
    },
  ],
};
export const fitness: Service = {
  id: "fitness",
  name: "Fitness First",
  description:
    "Explore gym memberships and personal training with Fitness First Thailand.",
  basis: "Nearby branch: Terminal 21 · 650 m",
  packages: [
    {
      id: "month",
      name: "One-month membership",
      description: "Gym access and group classes at the Terminal 21 branch.",
      price: 1500,
      saving: 400,
      unit: "/ month",
    },
    {
      id: "quarter",
      name: "Three-month membership",
      description: "Three months of gym access and group classes.",
      price: 3900,
      saving: 1800,
      unit: "/ 3 months",
    },
    {
      id: "training",
      name: "Personal training starter",
      description:
        "Five one-to-one sessions with a trainer. Membership not included.",
      price: 4500,
      saving: 1500,
      unit: "/ 5 sessions",
    },
  ],
};
export const services = [...homeServices, internet, fitness];
export const livingCategories = [
  {
    id: "home",
    name: "Home Services",
    description:
      "Housekeeping, laundry and air conditioner cleaning, priced for your home.",
  },
  {
    id: "internet",
    name: "WIFI/Internet",
    description:
      "Get connected with your existing modem. No technician needed.",
  },
  {
    id: "offers",
    name: "Special offers",
    description: "Explore resident packages and savings from our partners.",
  },
] as const;
