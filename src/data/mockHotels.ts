export const mockHotels = [
  {
    provider: "hotelbeds",
    hotelId: "HB-12345",
    name: "Grand Madrid Hotel",
    rating: 4.8,
    location: {
      latitude: 40.415363,
      longitude: -3.707398
    },
    address: "123 Gran Via, Madrid, Spain",
    zoneName: "City Center",
    minPrice: 150,
    maxPrice: 400,
    currency: "EUR",
    rooms: [
      {
        roomName: "Deluxe Double Room",
        board: "Breakfast Included",
        price: 180,
        pax: {
          adults: 2,
          children: 0
        },
        cancellationPolicy: {
          isRefundable: true,
          deadline: "2025-07-24T23:59:00Z"
        },
        rateKey: "HB-BOOK-KEY-XYZ",
        isBookable: true
      },
      {
        roomName: "Executive Suite",
        board: "Half Board",
        price: 280,
        pax: {
          adults: 2,
          children: 1
        },
        cancellationPolicy: {
          isRefundable: true,
          deadline: "2025-07-22T23:59:00Z"
        },
        rateKey: "HB-BOOK-KEY-ABC",
        isBookable: true
      }
    ]
  },
  {
    provider: "tbo",
    hotelId: "TBO-67890",
    name: "Sunset Beach Resort",
    rating: 4.2,
    location: {
      latitude: 40.423680,
      longitude: -3.692830
    },
    address: "456 Beachfront Road, Madrid, Spain",
    zoneName: "Retiro District",
    minPrice: 120,
    maxPrice: 300,
    currency: "EUR",
    rooms: [
      {
        roomName: "Standard Room",
        board: "Room Only",
        price: 120,
        pax: {
          adults: 2,
          children: 0
        },
        cancellationPolicy: {
          isRefundable: false,
          deadline: "2025-07-18T23:59:00Z"
        },
        rateKey: "TBO-BOOK-KEY-123",
        isBookable: true
      },
      {
        roomName: "Family Room",
        board: "All Inclusive",
        price: 250,
        pax: {
          adults: 2,
          children: 2
        },
        cancellationPolicy: {
          isRefundable: true,
          deadline: "2025-07-15T23:59:00Z"
        },
        rateKey: "TBO-BOOK-KEY-456",
        isBookable: true
      }
    ]
  },
  {
    provider: "hotelbeds",
    hotelId: "HB-54321",
    name: "Plaza Mayor Suites",
    rating: 4.5,
    location: {
      latitude: 40.415500,
      longitude: -3.706400
    },
    address: "78 Plaza Mayor, Madrid, Spain",
    zoneName: "City Center",
    minPrice: 200,
    maxPrice: 450,
    currency: "EUR",
    rooms: [
      {
        roomName: "Junior Suite",
        board: "Breakfast Included",
        price: 220,
        pax: {
          adults: 2,
          children: 0
        },
        cancellationPolicy: {
          isRefundable: true,
          deadline: "2025-07-20T23:59:00Z"
        },
        rateKey: "HB-BOOK-KEY-DEF",
        isBookable: true
      },
      {
        roomName: "Premium Suite",
        board: "Half Board",
        price: 350,
        pax: {
          adults: 2,
          children: 1
        },
        cancellationPolicy: {
          isRefundable: true,
          deadline: "2025-07-18T23:59:00Z"
        },
        rateKey: "HB-BOOK-KEY-GHI",
        isBookable: true
      }
    ]
  },
  {
    provider: "tbo",
    hotelId: "TBO-11223",
    name: "Urban Loft Apartments",
    rating: 4.1,
    location: {
      latitude: 40.426890,
      longitude: -3.703450
    },
    address: "22 Calle de Hortaleza, Madrid, Spain",
    zoneName: "Chueca",
    minPrice: 90,
    maxPrice: 180,
    currency: "EUR",
    rooms: [
      {
        roomName: "Studio Apartment",
        board: "Self Catering",
        price: 90,
        pax: {
          adults: 2,
          children: 0
        },
        cancellationPolicy: {
          isRefundable: true,
          deadline: "2025-07-23T23:59:00Z"
        },
        rateKey: "TBO-BOOK-KEY-789",
        isBookable: true
      },
      {
        roomName: "One-Bedroom Apartment",
        board: "Self Catering",
        price: 140,
        pax: {
          adults: 2,
          children: 1
        },
        cancellationPolicy: {
          isRefundable: true,
          deadline: "2025-07-21T23:59:00Z"
        },
        rateKey: "TBO-BOOK-KEY-012",
        isBookable: true
      }
    ]
  },
  {
    provider: "hotelbeds",
    hotelId: "HB-33445",
    name: "The Ritz Madrid",
    rating: 5.0,
    location: {
      latitude: 40.418330,
      longitude: -3.694440
    },
    address: "Plaza de la Lealtad, 5, Madrid, Spain",
    zoneName: "Golden Triangle of Art",
    minPrice: 450,
    maxPrice: 1200,
    currency: "EUR",
    rooms: [
      {
        roomName: "Deluxe Room",
        board: "Breakfast Included",
        price: 450,
        pax: {
          adults: 2,
          children: 0
        },
        cancellationPolicy: {
          isRefundable: true,
          deadline: "2025-07-10T23:59:00Z"
        },
        rateKey: "HB-BOOK-KEY-JKL",
        isBookable: true
      },
      {
        roomName: "Royal Suite",
        board: "Full Board",
        price: 1100,
        pax: {
          adults: 2,
          children: 2
        },
        cancellationPolicy: {
          isRefundable: true,
          deadline: "2025-07-05T23:59:00Z"
        },
        rateKey: "HB-BOOK-KEY-MNO",
        isBookable: true
      }
    ]
  },
  {
    provider: "tbo",
    hotelId: "TBO-55667",
    name: "Ibis Madrid Centro",
    rating: 3.7,
    location: {
      latitude: 40.412220,
      longitude: -3.699170
    },
    address: "Calle de Silva, 6, Madrid, Spain",
    zoneName: "Malasaña",
    minPrice: 65,
    maxPrice: 120,
    currency: "EUR",
    rooms: [
      {
        roomName: "Standard Double",
        board: "Room Only",
        price: 65,
        pax: {
          adults: 2,
          children: 0
        },
        cancellationPolicy: {
          isRefundable: false,
          deadline: "2025-07-25T23:59:00Z"
        },
        rateKey: "TBO-BOOK-KEY-PQR",
        isBookable: true
      },
      {
        roomName: "Twin Room",
        board: "Breakfast Included",
        price: 85,
        pax: {
          adults: 2,
          children: 0
        },
        cancellationPolicy: {
          isRefundable: true,
          deadline: "2025-07-20T23:59:00Z"
        },
        rateKey: "TBO-BOOK-KEY-STU",
        isBookable: true
      }
    ]
  },
  {
    provider: "hotelbeds",
    hotelId: "HB-77889",
    name: "Only YOU Boutique Hotel",
    rating: 4.6,
    location: {
      latitude: 40.419440,
      longitude: -3.700280
    },
    address: "Paseo de la Infanta Isabel, 13, Madrid, Spain",
    zoneName: "Atocha",
    minPrice: 160,
    maxPrice: 320,
    currency: "EUR",
    rooms: [
      {
        roomName: "YOU Room",
        board: "Breakfast Included",
        price: 160,
        pax: {
          adults: 2,
          children: 0
        },
        cancellationPolicy: {
          isRefundable: true,
          deadline: "2025-07-22T23:59:00Z"
        },
        rateKey: "HB-BOOK-KEY-VWX",
        isBookable: true
      },
      {
        roomName: "YOU Suite",
        board: "Breakfast Included",
        price: 280,
        pax: {
          adults: 2,
          children: 1
        },
        cancellationPolicy: {
          isRefundable: true,
          deadline: "2025-07-18T23:59:00Z"
        },
        rateKey: "HB-BOOK-KEY-YZ1",
        isBookable: true
      }
    ]
  },
  {
    provider: "tbo",
    hotelId: "TBO-99001",
    name: "VP Plaza España Design",
    rating: 4.4,
    location: {
      latitude: 40.423890,
      longitude: -3.711670
    },
    address: "Plaza de España, 5, Madrid, Spain",
    zoneName: "Argüelles",
    minPrice: 190,
    maxPrice: 380,
    currency: "EUR",
    rooms: [
      {
        roomName: "Design Room",
        board: "Room Only",
        price: 190,
        pax: {
          adults: 2,
          children: 0
        },
        cancellationPolicy: {
          isRefundable: true,
          deadline: "2025-07-21T23:59:00Z"
        },
        rateKey: "TBO-BOOK-KEY-234",
        isBookable: true
      },
      {
        roomName: "Design Suite",
        board: "Breakfast Included",
        price: 320,
        pax: {
          adults: 2,
          children: 2
        },
        cancellationPolicy: {
          isRefundable: true,
          deadline: "2025-07-17T23:59:00Z"
        },
        rateKey: "TBO-BOOK-KEY-567",
        isBookable: true
      }
    ]
  },
  {
    provider: "hotelbeds",
    hotelId: "HB-11223",
    name: "Dear Hotel Madrid",
    rating: 4.3,
    location: {
      latitude: 40.420830,
      longitude: -3.706940
    },
    address: "Gran Via, 80, Madrid, Spain",
    zoneName: "City Center",
    minPrice: 170,
    maxPrice: 300,
    currency: "EUR",
    rooms: [
      {
        roomName: "Dear Room",
        board: "Breakfast Included",
        price: 170,
        pax: {
          adults: 2,
          children: 0
        },
        cancellationPolicy: {
          isRefundable: true,
          deadline: "2025-07-23T23:59:00Z"
        },
        rateKey: "HB-BOOK-KEY-890",
        isBookable: true
      },
      {
        roomName: "Rooftop Room",
        board: "Breakfast Included",
        price: 250,
        pax: {
          adults: 2,
          children: 0
        },
        cancellationPolicy: {
          isRefundable: true,
          deadline: "2025-07-19T23:59:00Z"
        },
        rateKey: "HB-BOOK-KEY-1234",
        isBookable: true
      }
    ]
  },
  {
    provider: "tbo",
    hotelId: "TBO-33445",
    name: "Hotel Único Madrid",
    rating: 4.9,
    location: {
      latitude: 40.430560,
      longitude: -3.689170
    },
    address: "Claudio Coello, 67, Madrid, Spain",
    zoneName: "Salamanca",
    minPrice: 300,
    maxPrice: 650,
    currency: "EUR",
    rooms: [
      {
        roomName: "Classic Room",
        board: "Breakfast Included",
        price: 300,
        pax: {
          adults: 2,
          children: 0
        },
        cancellationPolicy: {
          isRefundable: true,
          deadline: "2025-07-24T23:59:00Z"
        },
        rateKey: "TBO-BOOK-KEY-5678",
        isBookable: true
      },
      {
        roomName: "Gourmet Room",
        board: "Dinner Included",
        price: 450,
        pax: {
          adults: 2,
          children: 0
        },
        cancellationPolicy: {
          isRefundable: true,
          deadline: "2025-07-20T23:59:00Z"
        },
        rateKey: "TBO-BOOK-KEY-9012",
        isBookable: true
      }
    ]
  },
  {
    provider: "hotelbeds",
    hotelId: "HB-55667",
    name: "Room Mate Oscar",
    rating: 4.0,
    location: {
      latitude: 40.419720,
      longitude: -3.698890
    },
    address: "Plaza de Pedro Zerolo, 12, Madrid, Spain",
    zoneName: "Chueca",
    minPrice: 110,
    maxPrice: 220,
    currency: "EUR",
    rooms: [
      {
        roomName: "Standard Room",
        board: "Room Only",
        price: 110,
        pax: {
          adults: 2,
          children: 0
        },
        cancellationPolicy: {
          isRefundable: true,
          deadline: "2025-07-22T23:59:00Z"
        },
        rateKey: "HB-BOOK-KEY-3456",
        isBookable: true
      },
      {
        roomName: "Terrace Room",
        board: "Breakfast Included",
        price: 180,
        pax: {
          adults: 2,
          children: 0
        },
        cancellationPolicy: {
          isRefundable: true,
          deadline: "2025-07-18T23:59:00Z"
        },
        rateKey: "HB-BOOK-KEY-7890",
        isBookable: true
      }
    ]
  }
];