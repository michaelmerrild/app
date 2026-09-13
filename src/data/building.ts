// Illustrative building information, not verified operating rules or contacts.
export const buildingInfo = {
  address: "123 Sukhumvit Road, Khlong Toei Nuea, Watthana, Bangkok 10110",
  updated: "15 Sep 2026",
  facilities: [
    {
      name: "Swimming pool",
      location: "5th floor",
      hours: "06:00–22:00 daily",
      note: "Shower before entering the pool.",
      icon: "water-outline",
    },
    {
      name: "Gym",
      location: "20th floor",
      hours: "06:00–22:00 daily",
      note: "Use your resident key card for access.",
      icon: "barbell-outline",
    },
    {
      name: "Residents’ lounge",
      location: "5th floor",
      hours: "08:00–21:00 daily",
      note: "Contact the juristic office to book private use.",
      icon: "cafe-outline",
    },
  ],
  rules: [
    {
      title: "Smoking",
      text: "No smoking on balconies or in shared indoor areas.",
    },
    {
      title: "Quiet hours",
      text: "Keep noise to a minimum between 22:00 and 08:00.",
    },
    {
      title: "Renovations & move-ins",
      text: "Arrange work and move-ins with the juristic office in advance. No renovation work on weekends or public holidays.",
    },
    {
      title: "Shared facilities",
      text: "Follow posted facility rules and accompany your guests.",
    },
  ],
  contacts: [
    {
      name: "Juristic office",
      location: "Ground floor",
      hours: "Mon–Sat · 09:00–18:00",
      description: "Building administration, bookings and access arrangements.",
      phone: null,
    },
    {
      name: "Reception & security",
      location: "Main lobby",
      hours: "24 hours daily",
      description: "Visitors, deliveries and after-hours building assistance.",
      phone: null,
    },
  ],
  essentials: [
    {
      title: "Access & visitors",
      text: "Use your key card at resident entrances. Visitors register at reception; meet delivery drivers in the lobby.",
    },
    {
      title: "Parcels",
      text: "Collect parcels from reception during collection hours. Confirm arrangements for large or refrigerated deliveries with the building team.",
    },
    {
      title: "Parking",
      text: "Register your vehicle with the juristic office. Ask reception about visitor parking. Your allocated space has not been added yet.",
    },
    {
      title: "Waste & recycling",
      text: "Use the designated disposal area and separate recycling. Ask the building team for its location and bulky-waste arrangements.",
    },
    {
      title: "Emergency information",
      text: "Refer to the building’s posted evacuation plan for fire exits and the assembly point. Emergency contact details have not been added yet.",
    },
  ],
} as const;
