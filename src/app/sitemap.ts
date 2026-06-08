import type { MetadataRoute } from "next";

const BASE_URL = "https://www.sibhi.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE_URL,
      lastModified: new Date("2026-06-01"),
      changeFrequency: "monthly",
      priority: 1.0,
      images: [
        `${BASE_URL}/og-image.png`,
        `${BASE_URL}/profile-main.jpg`,
      ],
    },
  ];
}
