"use server";

import { freePantryScans, proTierLimit } from "@/lib/arcjet";
import { checkUser } from "@/lib/checkUser";
import { request } from "@arcjet/next";
import { GoogleGenerativeAI } from "@google/generative-ai";

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

export async function scanPantryImage(formData) {
  try {
    const user = await checkUser();
    if (!user) {
      throw new Error("Unauthorized");
    }

    const isPro = user.subscriptionTier === "pro";

    //Apply Arcject rate limit
    const arcjetClient = isPro ? proTierLimit : freePantryScans;

    //Create a request object for Arcjet
    const req = await request();

    const decision = await arcjetClient.protect(req, {
      userId: user.clerkId,
      requested: 1,
    });

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        throw new Error(
          `Monthly scan limit reached ${
            isPro
              ? "Please contact support if you need more scans."
              : "Upgrade to Pro for unlimited scans!"
          }`,
        );
      }

      throw new Error("Request denied by security system.");
    }

    const image = formData.get("image");
    if (!image) {
      throw new Error("No image provided");
    }

    //convert to base64
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64Image = buffer.toString("base64");

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash-lite",
    });

    const prompt = `You are a professional chef and ingredient recognition expert. Analyze this image of a pantry/fridge and identify all visible food ingredients.

Return ONLY a valid JSON array with this exact structure (no markdown, no explanations):
[
  {
    "name": "ingredient name",
    "quantity": "estimated quantity with unit",
    "confidence": 0.95
  }
]

Rules:
- Only identify food ingredients (not containers, utensils, or packaging)
- Be specific (e.g., "Cheddar Cheese" not just "Cheese")
- Estimate realistic quantities (e.g., "3 eggs", "1 cup milk", "2 tomatoes")
- Confidence should be 0.7-1.0 (omit items below 0.7)
- Maximum 20 items
- Common pantry staples are acceptable (salt, pepper, oil)`;

    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          mimeType: image.type,
          data: base64Image,
        },
      },
    ]);

    const response = await result.response;
    const text = response.text();

    let ingredients;

    try {
      const cleanText = text
        .replace(/```json\n?/g, "")
        .replace(/```\n?/g, "")
        .trim();
      ingredients = JSON.parse(cleanText);
    } catch (error) {
      console.error("Failed to parse Gemini response:", text);
      throw new Error("Failed to parse ingredients. Please try again.");
    }

    if (!Array.isArray(ingredients) || ingredients.length === 0) {
      throw new Error(
        "No ingredients detected in the image. Please try a cleaner photo.",
      );
    }

    return {
      success: true,
      ingredients: ingredients.slice(0, 20),
      scansLimit: isPro ? "unlimited" : 10,
      message: `Found ${ingredients.length} ingredients!`,
    };
  } catch (error) {
    console.error("Error scanning pantry:", error);
    throw new Error(error.message || "Failed to scan image");
  }
}

export async function saveToPantry(formData) {}

export async function addPantryItemManually(formData) {}

export async function getPantryItems() {}

export async function deletePantryItem(formData) {}

export async function updatePantryItem(formData) {}
