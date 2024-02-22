const api = new URL(process.env.NEXT_PUBLIC_API_URL);
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
            {
                protocol: "https",
                hostname: api.hostname,
                port: "",
                pathname: "/static/profiles/**",
            },
        ],
    },
};

module.exports = nextConfig;
