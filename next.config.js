
const ContentSecurityPolicy = `
    default-src 'self' flash.soatra.com localhost;
    script-src 'self' 'unsafe-eval' 'unsafe-inline' cdn.flash-insights.soatra.com flash.soatra.com;
    style-src 'self' 'unsafe-inline';
    img-src * blob: data:;
    media-src localhost:9999;
    connect-src *;
    font-src 'self';
`.replace(/\n/g, '');


// origin-when-cross-origin
 
const securityHeaders = [
    { 
        key: 'Content-Security-Policy',
        value: ContentSecurityPolicy
    },
    { 
        key: 'Referrer-Policy',
        value: 'same-origin'
    },
    {
        key: 'X-Frame-Options',
        value: 'DENY'
    },
    { 
        key: 'X-Content-Type-Options',
        value: 'nosniff'
    },
    { 
        key: 'X-DNS-Prefetch-Control',
        value: 'on'
    },
    { 
        key: 'Strict-Transport-Security',
        value: 'max-age=31536000; includeSubDomains; preload'
    },
    { 
        key: 'Permissions-Policy',
        value: 'camera=(), microphone=(), geolocation=()'
    },
];
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            'rb.gy',
            'cdn.sanity.io',
            'localhost',
            'images.unsplash.com',
        ]
    },
    headers() {
        return [
            {
                source: '/(.*)',
                headers: securityHeaders
            },
        ];
      },
}

module.exports = nextConfig
