/** @type {import('next').NextConfig} */
console.log(api.hostname);
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
            {
                protocol: "https",
                hostname: "nextchat-api.onrender.com",
            },
        ],
    },
};

module.exports = nextConfig;
