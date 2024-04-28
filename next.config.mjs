/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'fastly.picsum.photos',
                port: '',
            }
        ]
    },
};

export default nextConfig;
