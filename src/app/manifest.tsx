import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "VALUE PEPTIDE",
    short_name: "VALUE PEPTIDE",
    description:
      "If you are looking to buy high-quality research peptides, stop by Value Peptide! We offer highly purified, safe, and effective peptides you can buy online today!",
    start_url: "/",
    display: "standalone",
    background_color: "#fffff",
    theme_color: "#fffff",
    icons: [
      {
        src: "/favicon/logoIcon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/favicon/logoIcon-384x384.png",
        sizes: "384x384",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/favicon/logoIcon-256x256.png",
        sizes: "256x256",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/favicon/logoIcon-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
