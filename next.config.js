/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        has: [{ type: "query", key: "_rsc" }],
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
  trailingSlash: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: process.env.IMAGE_API,
        port: "",
        pathname: "**",
      },
      {
        protocol: 'https',
        hostname: 'api.smartpeptides.bio',
        port: '',
        pathname: '**',
      },
      {
        protocol: "http",
        hostname: process.env.IMAGE_API,
        port: "",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "quickchart.io",
        port: "",
        pathname: "**",
      },
      //check this additionaly
      {
        protocol: "https",
        hostname: "api.valuepeptide.com",
        port: "",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "cdnvalue.pepapi.dev",
        port: "",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "fc-euc1-00-pics-bkt-00.s3.eu-central-1.amazonaws.com",
        port: "",
        pathname: "**",
      },
    ],
  },
};

module.exports = nextConfig;
