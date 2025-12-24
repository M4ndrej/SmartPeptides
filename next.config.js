/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export',
  // async redirects() {
  //   return [
  //     {
  //       source: "/product/:path",
  //       destination: "/:path",
  //       permanent: true,
  //       statusCode: 301,
  //     },
  //   ];
  // },
  async redirects() {
    return [
      {
        source: "/product/semaglutide",
        destination: "/product/glp-1sg/",
        permanent: true,
      },
      {
        source: "/product/semaglutide/",
        destination: "/product/glp-1sg/",
        permanent: true,
      },
      {
        source: "/product/retatrutide",
        destination: "/product/glp-3rt/",
        permanent: true,
      },
      {
        source: "/product/retatrutide/",
        destination: "/product/glp-3rt/",
        permanent: true,
      },
    ];
  },
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
        hostname: "api.peptide.shop",
        port: "",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "cdn.peptide.shop",
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
