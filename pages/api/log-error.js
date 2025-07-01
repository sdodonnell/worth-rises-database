export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const errorData = req.body;
    
    // Log detailed error information to console (will appear in Vercel logs)
    console.error('CLIENT ERROR CAUGHT:', {
      timestamp: errorData.timestamp,
      message: errorData.message,
      url: errorData.url,
      userAgent: errorData.userAgent,
      stack: errorData.stack,
      componentStack: errorData.componentStack,
    });

    // You could also send to external error tracking service here
    // Examples: Sentry, LogRocket, Bugsnag, etc.
    
    res.status(200).json({ success: true, message: 'Error logged successfully' });
  } catch (error) {
    console.error('Error logging failed:', error);
    res.status(500).json({ message: 'Failed to log error' });
  }
}