export const mockHotels = [
  {
    id: "HL-MAD-001",
    name: "Grand Madrid Hotel",
    rating: 4.8,
    stars: 5,
    description: "Luxurious 5-star hotel featuring panoramic city views, gourmet restaurants, and a rooftop infinity pool.",
    location: {
      latitude: 40.415363,
      longitude: -3.707398
    },
    address: "123 Gran Via, Madrid, Spain",
    zoneName: "City Center",
    amenities: ["Free WiFi", "Swimming Pool", "Spa", "Fitness Center", "Restaurant"],
    images: [
      '/hotel-2.jpg',
      '/hotel-1.jpg',
      '/hotel-3.jpg'
    ],
    facilities: ["Business Center", "Concierge", "Valet Parking", "24/7 Room Service"],
    providers: [
      {
        provider: "hotelbeds",
        hotelId: "HB-12345",
        minPrice: 150,
        maxPrice: 400,
        currency: "EUR",
        rooms: [
          {
            roomName: "Deluxe Double Room",
            board: "Breakfast Included",
            price: 180,
            pax: { adults: 2, children: 0 },
            cancellationPolicy: {
              isRefundable: true,
              deadline: "2025-07-24T23:59:00Z"
            },
            rateKey: "HB-BOOK-KEY-XYZ",
            isBookable: true
          }
        ]
      },
      {
        provider: "tbo",
        hotelId: "TBO-GRAND-MAD",
        minPrice: 140,
        maxPrice: 380,
        currency: "EUR",
        rooms: [
          {
            roomName: "Premium City View",
            board: "Breakfast Included",
            price: 140,
            pax: { adults: 2, children: 1 },
            cancellationPolicy: {
              isRefundable: true,
              deadline: "2025-07-25T23:59:00Z"
            },
            rateKey: "TBO-BOOK-KEY-GM",
            isBookable: true
          }
        ]
      },
      {
        provider: "hotleno-direct",
        hotelId: "HD-GRAND-MAD",
        minPrice: 135,
        maxPrice: 370,
        currency: "EUR",
        rooms: [
          {
            roomName: "Hotleno Exclusive Suite",
            board: "Half Board + Pool Access",
            price: 210,
            pax: { adults: 2, children: 0 },
            cancellationPolicy: {
              isRefundable: true,
              deadline: "2025-07-26T23:59:00Z"
            },
            rateKey: "HD-BOOK-KEY-001",
            isBookable: true,
            perks: ["Free Room Upgrade", "Late Checkout"]
          }
        ]
      }
    ],
    guestRating: {
      cleanliness: 4.7,
      comfort: 4.5,
      location: 3,
      staff: 4.7,
      valueForMoney: 4.3
    },
    reviews: [
      {
        author: "Olivia García",
        date: "2025-07-12",
        rating: 4.5,
        title: "Charming boutique experience",
        content: "The art tour was a highlight! Beautiful architecture and personalized service made our stay special."
      },
      {
        author: "James Thompson",
        date: "2025-06-30",
        rating: 4.0,
        title: "Unique but small rooms",
        content: "Loved the historic character though rooms are compact. Excellent location in the shopping district."
      },
      {
        author: "Isabella Rossi",
        date: "2025-06-15",
        rating: 5.0,
        title: "Like staying in a museum",
        content: "Attention to detail was impressive. The complimentary wine tasting was an unexpected delight!"
      }
    ],
  },

  {
    id: "HL-MAD-050",
    name: "Hotleno Boutique Experience",
    rating: 4.6,
    stars: 4,
    description: "Exclusive Hotleno-partnered boutique hotel in a restored 19th-century mansion with personalized service.",
    location: {
      latitude: 40.417850,
      longitude: -3.699120
    },
    address: "8 Calle de Serrano, Madrid, Spain",
    zoneName: "Salamanca District",
    amenities: ["Free WiFi", "Terrace", "Designer Toiletries", "Nespresso Machine"],
    images: [
      "/hotel-21.jpg",
      "/hotel-22.jpg"
    ],
    facilities: ["Art Gallery", "Wine Cellar", "Bicycle Rental"],
    providers: [
      {
        provider: "hotleno-direct",
        hotelId: "HD-BOUTIQUE-050",
        minPrice: 125,
        maxPrice: 290,
        currency: "EUR",
        rooms: [
          {
            roomName: "Art Deco Room",
            board: "Breakfast Included",
            price: 125,
            pax: { adults: 2, children: 0 },
            cancellationPolicy: {
              isRefundable: true,
              deadline: "2025-07-28T23:59:00Z"
            },
            rateKey: "HD-BOOK-KEY-050A",
            isBookable: true,
            perks: ["Complimentary Art Tour"]
          }
        ]
      }
    ],
    guestRating: {
      cleanliness: 4.7,
      comfort: 4.5,
      location: 3,
      staff: 4.7,
      valueForMoney: 4.3
    },
    reviews: [
      {
        author: "Olivia García",
        date: "2025-07-12",
        rating: 4.5,
        title: "Charming boutique experience",
        content: "The art tour was a highlight! Beautiful architecture and personalized service made our stay special."
      },
      {
        author: "James Thompson",
        date: "2025-06-30",
        rating: 4.0,
        title: "Unique but small rooms",
        content: "Loved the historic character though rooms are compact. Excellent location in the shopping district."
      },
      {
        author: "Isabella Rossi",
        date: "2025-06-15",
        rating: 5.0,
        title: "Like staying in a museum",
        content: "Attention to detail was impressive. The complimentary wine tasting was an unexpected delight!"
      }
    ],
  },

  {
    id: "HL-MAD-002",
    name: "Ibis Madrid Centro",
    rating: 3.7,
    stars: 3,
    description: "Reliable budget accommodation in central location with modern amenities. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse ducimus ipsam cupiditate hic saepe expedita quasi eum necessitatibus ullam sit laborum sunt culpa dignissimos veritatis placeat ad, odit est sapiente. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse ducimus ipsam cupiditate hic saepe expedita quasi eum necessitatibus ullam sit laborum sunt culpa dignissimos veritatis placeat ad, odit est sapiente. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Et, consequatur recusandae ratione, aliquid ad doloremque magni fugiat reiciendis aliquam, corrupti assumenda a? Maiores exercitationem et officia dolorem deleniti distinctio eius!",
    location: {
      latitude: 40.412220,
      longitude: -3.699170
    },
    address: "Calle de Silva, 6, Madrid, Spain",
    zoneName: "Malasaña",
    amenities: ["Free WiFi", "24hr Snack Bar", "Air Conditioning"],
    images: [
      "/hotel-31.jpg",
      "/hotel-32.jpg",
      "/hotel-33.jpg"
    ],
    facilities: ["Luggage Storage", "Vending Machines"],
    providers: [
      {
        provider: "tbo",
        hotelId: "TBO-55667",
        minPrice: 65,
        maxPrice: 120,
        currency: "EUR",
        rooms: [
          {
            roomName: "Standard Double",
            board: "Room Only",
            price: 65,
            pax: { adults: 2, children: 0 },
            cancellationPolicy: {
              isRefundable: false,
              deadline: "2025-07-25T23:59:00Z"
            },
            rateKey: "TBO-BOOK-KEY-PQR",
            isBookable: true
          }
        ]
      },
      {
        provider: "hotleno-direct",
        hotelId: "HD-IBIS-MAD",
        minPrice: 62,
        maxPrice: 110,
        currency: "EUR",
        rooms: [
          {
            roomName: "Hotleno Smart Room",
            board: "Breakfast Included",
            price: 70,
            pax: { adults: 2, children: 0 },
            cancellationPolicy: {
              isRefundable: true,
              deadline: "2025-07-23T23:59:00Z"
            },
            rateKey: "HD-BOOK-KEY-IBIS",
            isBookable: true,
            perks: ["Early Check-in"]
          }
        ]
      }
    ],
    guestRating: {
      cleanliness: 4.7,
      comfort: 4.5,
      location: 3,
      staff: 4.7,
      valueForMoney: 4.3
    },
    reviews: [
      {
        author: "Olivia García",
        date: "2025-07-12",
        rating: 4.5,
        title: "Charming boutique experience",
        content: "The art tour was a highlight! Beautiful architecture and personalized service made our stay special."
      },
      {
        author: "James Thompson",
        date: "2025-06-30",
        rating: 4.0,
        title: "Unique but small rooms",
        content: "Loved the historic character though rooms are compact. Excellent location in the shopping district."
      },
      {
        author: "Isabella Rossi",
        date: "2025-06-15",
        rating: 5.0,
        title: "Like staying in a museum",
        content: "Attention to detail was impressive. The complimentary wine tasting was an unexpected delight!"
      }
    ],
  },

  {
    id: "HL-MAD-003",
    name: "The Ritz Madrid",
    rating: 5.0,
    stars: 5,
    description: "Iconic luxury hotel featuring opulent interiors, Michelin-star dining, and royal suite accommodations.",
    location: {
      latitude: 40.418330,
      longitude: -3.694440
    },
    address: "Plaza de la Lealtad, 5, Madrid, Spain",
    zoneName: "Golden Triangle of Art",
    amenities: ["Free WiFi", "Spa", "Swimming Pool", "Butler Service"],
    images: [
      "/hotel-41.jpg",
      "/hotel-42.jpg"
    ],
    facilities: ["Fine Dining Restaurant", "Tea Lounge", "Limousine Service"],
    providers: [
      {
        provider: "hotelbeds",
        hotelId: "HB-33445",
        minPrice: 450,
        maxPrice: 1200,
        currency: "EUR",
        rooms: [
          {
            roomName: "Deluxe Room",
            board: "Breakfast Included",
            price: 450,
            pax: { adults: 2, children: 0 },
            cancellationPolicy: {
              isRefundable: true,
              deadline: "2025-07-10T23:59:00Z"
            },
            rateKey: "HB-BOOK-KEY-JKL",
            isBookable: true
          }
        ]
      },
      {
        provider: "hotleno-direct",
        hotelId: "HD-RITZ-MAD",
        minPrice: 430,
        maxPrice: 1150,
        currency: "EUR",
        rooms: [
          {
            roomName: "Hotleno Royal Experience",
            board: "Full Board + Spa Access",
            price: 980,
            pax: { adults: 2, children: 0 },
            cancellationPolicy: {
              isRefundable: true,
              deadline: "2025-07-15T23:59:00Z"
            },
            rateKey: "HD-BOOK-KEY-RITZ",
            isBookable: true,
            perks: ["Airport Transfer", "Champagne Welcome"]
          }
        ]
      }
    ],
    guestRating: {
      cleanliness: 4.7,
      comfort: 4.5,
      location: 3,
      staff: 4.7,
      valueForMoney: 4.3
    },
    reviews: [
      {
        author: "Olivia García",
        date: "2025-07-12",
        rating: 4.5,
        title: "Charming boutique experience",
        content: "The art tour was a highlight! Beautiful architecture and personalized service made our stay special."
      },
      {
        author: "James Thompson",
        date: "2025-06-30",
        rating: 4.0,
        title: "Unique but small rooms",
        content: "Loved the historic character though rooms are compact. Excellent location in the shopping district."
      },
      {
        author: "Isabella Rossi",
        date: "2025-06-15",
        rating: 5.0,
        title: "Like staying in a museum",
        content: "Attention to detail was impressive. The complimentary wine tasting was an unexpected delight!"
      }
    ],
  },

  {
    id: "HL-MAD-004",
    name: "Plaza Mayor Suites",
    rating: 4.5,
    stars: 4,
    description: "Modern business suites with kitchenettes near Plaza Mayor, perfect for extended stays.",
    location: {
      latitude: 40.415500,
      longitude: -3.706400
    },
    address: "78 Plaza Mayor, Madrid, Spain",
    zoneName: "City Center",
    amenities: ["Free WiFi", "Kitchenette", "Work Desk", "Coffee Maker"],
    images: [

    ],
    facilities: ["Business Lounge", "Meeting Rooms", "Dry Cleaning"],
    providers: [
      {
        provider: "hotelbeds",
        hotelId: "HB-54321",
        minPrice: 200,
        maxPrice: 450,
        currency: "EUR",
        rooms: [
          {
            roomName: "Junior Suite",
            board: "Breakfast Included",
            price: 220,
            pax: { adults: 2, children: 0 },
            cancellationPolicy: {
              isRefundable: true,
              deadline: "2025-07-20T23:59:00Z"
            },
            rateKey: "HB-BOOK-KEY-DEF",
            isBookable: true
          }
        ]
      },
      {
        provider: "tbo",
        hotelId: "TBO-PLAZA-SUITES",
        minPrice: 190,
        maxPrice: 420,
        currency: "EUR",
        rooms: [
          {
            roomName: "Executive Studio",
            board: "Room Only",
            price: 190,
            pax: { adults: 2, children: 0 },
            cancellationPolicy: {
              isRefundable: true,
              deadline: "2025-07-22T23:59:00Z"
            },
            rateKey: "TBO-BOOK-KEY-PLAZA",
            isBookable: true
          }
        ]
      },
      {
        provider: "hotleno-direct",
        hotelId: "HD-PLAZA-004",
        minPrice: 185,
        maxPrice: 400,
        currency: "EUR",
        rooms: [
          {
            roomName: "Hotleno Business Suite",
            board: "Breakfast + Dinner Credit",
            price: 240,
            pax: { adults: 2, children: 0 },
            cancellationPolicy: {
              isRefundable: true,
              deadline: "2025-07-24T23:59:00Z"
            },
            rateKey: "HD-BOOK-KEY-BIZ",
            isBookable: true,
            perks: ["Free Meeting Room Access"]
          }
        ]
      }
    ],
    guestRating: {
      cleanliness: 4.7,
      comfort: 4.5,
      location: 3,
      staff: 4.7,
      valueForMoney: 4.3
    },
    reviews: [
      {
        author: "Olivia García",
        date: "2025-07-12",
        rating: 4.5,
        title: "Charming boutique experience",
        content: "The art tour was a highlight! Beautiful architecture and personalized service made our stay special."
      },
      {
        author: "James Thompson",
        date: "2025-06-30",
        rating: 4.0,
        title: "Unique but small rooms",
        content: "Loved the historic character though rooms are compact. Excellent location in the shopping district."
      },
      {
        author: "Isabella Rossi",
        date: "2025-06-15",
        rating: 5.0,
        title: "Like staying in a museum",
        content: "Attention to detail was impressive. The complimentary wine tasting was an unexpected delight!"
      }
    ],
  }
];