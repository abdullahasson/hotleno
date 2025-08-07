'use client'; // هذا مهم لأنه صفحة عميل

import { useState } from 'react';
import { hotelbedsClient } from '@/lib/hotelbeds';

export default function HotelbedsTestPage() {
    const [testResults, setTestResults] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    const runTest = async () => {
        setLoading(true);
        const results = [];

        try {
            // اختبار 1: البحث عن الفنادق
            const searchResult = await hotelbedsClient.searchHotels({
                stay: {
                    checkIn: "2025-12-01",
                    checkOut: "2025-12-05"
                },
                occupancies: [{ rooms: 1, adults: 2 }],
                destination: { code: "PMI" }
            });

            results.push({
                test: 'Hotel Search',
                success: !searchResult.error,
                data: searchResult.error ? searchResult.error : searchResult.data
            });

            // إذا نجح البحث، نجري اختبار التفاصيل
            if (!searchResult.error) {
                const rateKey = searchResult.data.hotels[0]?.rooms[0]?.rates[0]?.rateKey;

                if (rateKey) {
                    const checkRatesResult = await hotelbedsClient.checkRates({
                        rooms: [{ rateKey }]
                    });

                    results.push({
                        test: 'Check Rates',
                        success: !checkRatesResult.error,
                        data: checkRatesResult.error ? checkRatesResult.error : checkRatesResult.data
                    });

                    // إذا نجح الحصول على التفاصيل، نجري اختبار الحجز
                    if (!checkRatesResult.error) {
                        const bookingResult = await hotelbedsClient.createBooking({
                            holder: {
                                name: "Test",
                                surname: "User"
                            },
                            rooms: [{
                                rateKey: checkRatesResult.data.rooms[0].rateKey,
                                details: [{ type: "AD", age: 30 }]
                            }],
                            clientReference: "TEST_123"
                        });

                        results.push({
                            test: 'Create Booking',
                            success: !bookingResult.error,
                            data: bookingResult.error ? bookingResult.error : bookingResult.data
                        });

                        // إذا نجح الحجز، نجرب الإلغاء
                        if (!bookingResult.error) {
                            const bookingId = bookingResult.data.booking.reference;
                            const cancelResult = await hotelbedsClient.cancelBooking(bookingId);

                            results.push({
                                test: 'Cancel Booking',
                                success: !cancelResult.error,
                                data: cancelResult.error ? cancelResult.error : cancelResult.data
                            });
                        }
                    }
                }
            }
        } catch (error) {
            results.push({
                test: 'Full Flow',
                success: false,
                data: error instanceof Error ? error.message : 'Unknown error'
            });
        } finally {
            setLoading(false);
            setTestResults(results);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Hotelbeds API Certification Tests</h1>

            <button
                onClick={runTest}
                disabled={loading}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
            >
                {loading ? 'Running Tests...' : 'Run Certification Tests'}
            </button>

            <div className="mt-6">
                <h2 className="text-xl font-semibold mb-2">Test Results</h2>

                {testResults.length === 0 && !loading && (
                    <p>No tests run yet. Click the button above to start testing.</p>
                )}

                {testResults.map((result, index) => (
                    <div key={index} className="mb-4 p-4 border rounded">
                        <div className="flex items-center mb-2">
                            <span className={`inline-block w-3 h-3 rounded-full mr-2 ${result.success ? 'bg-green-500' : 'bg-red-500'}`}></span>
                            <h3 className="text-lg font-medium">{result.test}</h3>
                            <span className="ml-auto">{result.success ? '✅ Passed' : '❌ Failed'}</span>
                        </div>

                        <div className="bg-gray-100 p-3 rounded mt-2">
                            <pre className="text-sm overflow-x-auto">{JSON.stringify(result.data, null, 2)}</pre>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}