/** @type {import('next').NextConfig}*/

const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    compiler: {
        removeConsole: process.env.NODE_ENV !== 'development'
    },
    serverRuntimeConfig: {
        bodySiziLimit: '3mb'
    },
    async redirects() {
        return [
            {
                source: '/',
                destination: '/login',
                permanent: true,
            },
        ];
    }
};

const withPWA = require('next-pwa')({
    dest: 'public',
    disable: process.env.NODE_ENV === "development",
    register: true,
    skipWaiting: true
});

module.exports = withPWA(nextConfig);
