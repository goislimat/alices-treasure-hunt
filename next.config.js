/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: [
      "i.gifer.com",
      "media2.giphy.com",
      "media4.giphy.com",
      "media.tenor.com",
      "thumbs.gfycat.com",
      "i.pinimg.com",
      "whoissamjarvis.files.wordpress.com",
    ],
  },
};

module.exports = nextConfig;
