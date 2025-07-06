interface FlightData {
    flight_number: string;
    link: string;
    origin_airport: string;
    destination_airport: string;
    departure_at: string; // ISO 8601 format
    airline: string;
    destination: string;
    origin: string;
    price: number;
    return_transfers: number;
    duration: number; // in minutes
    duration_to: number;
    duration_back: number;
    transfers: number;
}


export interface FlightListProps {
    flights: FlightData[];
    currency: string;
    destination: string;
    tripType: string;
    returnDate: Date | null;
    departureDate: Date | null;
    totalPassengers: number;
    originNow: string;
}