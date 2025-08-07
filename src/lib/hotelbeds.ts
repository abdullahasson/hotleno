import { HotelbedsResponse } from '@/app/api/hotelbeds/types';

const API_BASE_URL = '/api/hotelbeds';

export const hotelbedsClient = {
  async request<T = any>(
    endpoint: string, 
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
    body?: any,
    query?: Record<string, string>
  ): Promise<HotelbedsResponse<T>> {
    try {
      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ endpoint, method, body, query })
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        return {
          error: {
            code: errorResponse.error?.code || 'CLIENT_ERROR',
            message: errorResponse.error?.message || `Request failed with status ${response.status}`,
            status: response.status
          }
        };
      }

      return await response.json();
    } catch (error: any) {
      return {
        error: {
          code: 'NETWORK_ERROR',
          message: error.message || 'Network error occurred'
        }
      };
    }
  },

  // دوال محددة للعمليات الأساسية
  async searchHotels(params: any) {
    return this.request('/hotel-api/1.0/hotels', 'POST', params);
  },

  async checkRates(params: any) {
    return this.request('/hotel-api/1.0/checkrates', 'POST', params);
  },

  async createBooking(params: any) {
    return this.request('/hotel-api/1.0/bookings', 'POST', {
      ...params,
      testMode: true // تأكد من وضع الاختبار للحجوزات التجريبية
    });
  },

  async cancelBooking(bookingId: string) {
    return this.request(
      `/hotel-api/1.0/bookings/${bookingId}/cancel`, 
      'DELETE', 
      null, 
      { cancellationFlag: 'CANCELLATION' }
    );
  },

  async getBooking(bookingId: string) {
    return this.request(`/hotel-api/1.0/bookings/${bookingId}`, 'GET');
  }
};