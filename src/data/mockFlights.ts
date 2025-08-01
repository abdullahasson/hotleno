export const mockFlights = {
    "searchId": "search-f-77c6f4c5",
    "metadata": {
        "totalResults": 2,
        "defaultCurrency": "USD",
        "availableCurrencies": ["USD", "EUR", "SAR"]
    },
    "results": [
        {
            "provider": "tbo_holidays",
            "flightId": "TBO-FL-9876",
            "price": 480,
            "priceDetails": {
                "base": 400,
                "taxes": 50
            },
            "legs": [
                {
                    "direction": "outbound",
                    "totalDurationMinutes": 1050,
                    "stops": 1,
                    "stopovers": [
                        {
                            "airport": {
                                "code": "DXB",
                                "name": "Dubai International Airport"
                            },
                            "durationMinutes": 150
                        }
                    ],
                    "segments": [
                        {
                            "airline": {
                                "code": "EK",
                                "name": "Emirates"
                            },
                            "flightNumber": "EK074",
                            "cabinClass": "ECONOMY",
                            "departure": {
                                "code": "CDG",
                                "at": "2025-09-15T14:00:00Z",
                                "timezone": "+02:00"
                            },
                            "arrival": {
                                "code": "DXB",
                                "at": "2025-09-15T22:30:00Z",
                                "timezone": "+04:00"
                            },
                            "durationMinutes": 570
                        },
                        {
                            "airline": {
                                "code": "EK",
                                "name": "Emirates"
                            },
                            "flightNumber": "EK912",
                            "cabinClass": "ECONOMY",
                            "departure": {
                                "code": "DXB",
                                "at": "2025-09-16T01:00:00Z",
                                "timezone": "+04:00"
                            },
                            "arrival": {
                                "code": "JED",
                                "at": "2025-09-16T03:30:00Z",
                                "timezone": "+03:00"
                            },
                            "durationMinutes": 150
                        }
                    ]
                },
                {
                    "direction": "inbound",
                    "totalDurationMinutes": 890,
                    "stops": 1,
                    "stopovers": [
                        {
                            "airport": {
                                "code": "DXB",
                                "name": "Dubai International Airport"
                            },
                            "durationMinutes": 120
                        }
                    ],
                    "segments": [
                        {
                            "airline": {
                                "code": "EK",
                                "name": "Emirates"
                            },
                            "flightNumber": "EK813",
                            "cabinClass": "ECONOMY",
                            "departure": {
                                "code": "JED",
                                "at": "2025-09-22T10:00:00Z",
                                "timezone": "+03:00"
                            },
                            "arrival": {
                                "code": "DXB",
                                "at": "2025-09-22T12:30:00Z",
                                "timezone": "+04:00"
                            },
                            "durationMinutes": 150
                        },
                        {
                            "airline": {
                                "code": "EK",
                                "name": "Emirates"
                            },
                            "flightNumber": "EK073",
                            "cabinClass": "ECONOMY",
                            "departure": {
                                "code": "DXB",
                                "at": "2025-09-22T14:30:00Z",
                                "timezone": "+04:00"
                            },
                            "arrival": {
                                "code": "CDG",
                                "at": "2025-09-22T19:50:00Z",
                                "timezone": "+02:00"
                            },
                            "durationMinutes": 440
                        }
                    ]
                }
            ],
            "baggage": {
                "carryOn": {
                    "pieces": 1,
                    "weightKg": 7
                },
                "checked": {
                    "pieces": 1,
                    "weightKg": 23
                }
            },
            "fareConditions": {
                "refundable": false,
                "changeable": true
            },
            "rateKey": "TBO-BOOK-KEY-FL-123",
            "isBookable": true,
            "deepLink": "https://tbo.com/book?key=TBO-BOOK-KEY-FL-123"
        }
    ]
};