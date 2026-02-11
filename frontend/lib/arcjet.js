import arcjet, { tokenBucket } from "@arcjet/next";

export const aj = arcjet({
  key: process.env.ARCJET_KEY,
  rules: [],
});

// Free tier pantry scan limits (10 per month)

export const freePantryScans = aj.withRule(
  tokenBucket({
    mode: "LIVE",
    characteristics: ["userId"],
    refillRate: 10,
    interval: "30d",
    capacity: 10,
  }),
);

//Free tier meal recommendations (5 per month)
export const freeMealRecommendations = aj.withRule(
  tokenBucket({
    mode: "LIVE",
    characteristics: ["userId"],
    refillRate: 5,
    interval: "30d",
    capacity: 5,
  }),
);

// Pro tier - unlimited (very high limits)
// 1000 requests per day should be enough for any user
export const proTierLimit = aj.withRule(
  tokenBucket({
    mode: "LIVE",
    characteristics: ["userId"],
    refillRate: 10,
    interval: "30d",
    capacity: 10,
  }),
);
