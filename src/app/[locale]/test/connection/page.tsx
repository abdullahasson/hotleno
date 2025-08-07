// app/test/connection/page.tsx
'use client';

import { useState } from 'react';

export default function ConnectionTestPage() {
  const [testResult, setTestResult] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const testConnection = async () => {
    setLoading(true);
    setTestResult('Testing connection...');
    
    try {
      // اختبار اتصال مباشر
      const response = await fetch('https://api.test.hotelbeds.com', {
        method: 'HEAD',
        redirect: 'manual'
      });
      
      if (response.status === 0 || response.status === 200) {
        setTestResult('✅ Connection successful! API endpoint is reachable.');
      } else {
        setTestResult(`⚠️ Unexpected status: ${response.status} ${response.statusText}`);
      }
    } catch (error: any) {
      setTestResult(`❌ Connection failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">API Connection Test</h1>
      
      <button 
        onClick={testConnection}
        disabled={loading}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 mb-4"
      >
        {loading ? 'Testing...' : 'Test Connection to Hotelbeds API'}
      </button>
      
      <div className="mt-4 p-4 bg-gray-100 rounded">
        <h2 className="text-lg font-semibold mb-2">Test Result:</h2>
        <pre className="whitespace-pre-wrap">{testResult}</pre>
      </div>
      
      <div className="mt-6 bg-yellow-50 p-4 rounded border border-yellow-200">
        <h3 className="text-lg font-semibold mb-2">Troubleshooting Tips:</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li>Ensure your internet connection is working</li>
          <li>Check if your firewall allows connections to api.test.hotelbeds.com</li>
          <li>Try accessing <a href="https://api.test.hotelbeds.com" target="_blank" className="text-blue-500">https://api.test.hotelbeds.com</a> in your browser</li>
          <li>Verify that your VPN (if any) isn't blocking the connection</li>
          <li>Try disabling browser extensions that might block requests</li>
        </ul>
      </div>
    </div>
  );
}