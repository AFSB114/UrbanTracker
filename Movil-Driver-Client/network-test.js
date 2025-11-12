// Network Connectivity Test Script
// Run this to test backend connectivity

const API_BASE_URL = 'http://10.3.235.237:8080/api/v1';
const TEST_ENDPOINTS = [
  `${API_BASE_URL}`,
  `${API_BASE_URL}/public/auth/login`,
  `${API_BASE_URL}/health`  // if your backend has a health endpoint
];

async function testNetworkConnectivity() {
  console.log('🔍 Testing Backend Connectivity...');
  console.log('API Base URL:', API_BASE_URL);
  console.log('='.repeat(50));
  
  for (let i = 0; i < TEST_ENDPOINTS.length; i++) {
    const endpoint = TEST_ENDPOINTS[i];
    console.log(`\n📡 Testing endpoint ${i + 1}: ${endpoint}`);
    
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      
      const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      console.log(`✅ Response Status: ${response.status} ${response.statusText}`);
      console.log(`✅ Response OK: ${response.ok}`);
      console.log(`📄 Content-Type: ${response.headers.get('content-type')}`);
      
      if (response.ok) {
        const text = await response.text();
        console.log(`📝 Response Body (first 200 chars): ${text.substring(0, 200)}...`);
      } else {
        console.log(`❌ Error Response:`, await response.text());
      }
      
    } catch (error) {
      console.log(`❌ Connection Failed:`, error.message);
      if (error.name === 'AbortError') {
        console.log('⏱️  Request timed out after 5 seconds');
      }
    }
  }
}

// Export for use in Node.js or browser
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { testNetworkConnectivity, API_BASE_URL, TEST_ENDPOINTS };
} else {
  // Make available globally for browser console
  window.testNetworkConnectivity = testNetworkConnectivity;
}

// Run test if executed directly
if (typeof window === 'undefined') {
  testNetworkConnectivity().catch(console.error);
}