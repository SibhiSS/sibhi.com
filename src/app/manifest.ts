import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Sibhi S — Engineer · Researcher · Builder",
    short_name: "Sibhi S",
    description:
      "Personal portfolio of Sibhi S — a Computer Science Engineering student at VIT Chennai exploring cybersecurity, quantum computing, and machine learning.",
    start_url: "/",
    display: "standalone",
    background_color: "#030303",
    theme_color: "#030303",
    orientation: "portrait-primary",
    scope: "/",
    lang: "en",
    categories: ["portfolio", "technology", "education"],
    icons: [
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icon.png",
        sizes: "any",
        type: "image/png",
        purpose: "any",
      },
    ],

  };
}
