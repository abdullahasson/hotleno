export interface HotelbedsRequest {
  endpoint: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: any;
  query?: Record<string, string>;
}

export interface HotelbedsError {
  code: string;
  message: string;
  status?: number;
}

export interface HotelbedsResponse<T = any> {
  data?: T;
  error?: HotelbedsError;
}