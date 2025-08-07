import crypto from 'crypto';

export const generateSignature = (apiKey: string, apiSecret: string) => {
  const timestamp = Math.floor(Date.now() / 1000);
  const signatureString = apiKey + apiSecret + timestamp;
  const signature = crypto.createHash('sha256').update(signatureString).digest('hex');
  return { signature, timestamp };
};

export const getHotelbedsHeaders = (apiKey: string, apiSecret: string) => {
  const { signature, timestamp } = generateSignature(apiKey, apiSecret);
  
  // تحقق من استخدام البيئة الصحيحة
  const isSandbox = process.env.HOTELBEDS_API_URL?.includes('test');
  
  return {
    'Api-Key': apiKey,
    'X-Signature': signature,
    'Accept': 'application/json',
    'Accept-Encoding': 'gzip, deflate',
    'Content-Type': 'application/json',
    'X-Timestamp': timestamp.toString(),
    // إضافة معلومات التطبيق للمساعدة في التصحيح
    'User-Agent': `MyHotelApp/${isSandbox ? 'Sandbox' : 'Production'}`
  };
};

export const handleHotelbedsResponse = async (response: Response) => {
  if (!response.ok) {
    const errorResponse = await response.json();
    return {
      error: {
        code: errorResponse.error?.code || 'UNKNOWN_ERROR',
        message: errorResponse.error?.message || 'Unknown Hotelbeds API error',
        status: response.status
      }
    };
  }
  return { data: await response.json() };
};