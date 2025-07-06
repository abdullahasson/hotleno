interface FlightTimes {
    departureTime: string;
    arrivalTime: string;
}

export function formatFlightTimes(departureAt: string, durationTo: number): FlightTimes {
    // Parse departure time
    const departureDate = new Date(departureAt);

    // Format departure time (HH:MM AM/PM)
    const departureTime = departureDate.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });

    // Calculate arrival time (departure time + duration in minutes)
    const arrivalDate = new Date(departureDate.getTime() + durationTo * 60000);

    // Format arrival time (HH:MM AM/PM)
    const arrivalTime = arrivalDate.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });

    return {
        departureTime,
        arrivalTime
    };
}

