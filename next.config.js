/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: "lh3.googleusercontent.com",
                protocol: "https",
            },
            {
                hostname: `localhost`,
            },
        ],
    },
};

module.exports = nextConfig;
