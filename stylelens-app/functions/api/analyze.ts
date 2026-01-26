
interface Env {
    OPENAI_API_KEY: string;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
    const { request, env } = context;

    // Handle CORS
    if (request.method === "OPTIONS") {
        return new Response(null, {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "POST, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type",
            },
        });
    }

    if (!env.OPENAI_API_KEY) {
        return new Response(JSON.stringify({ error: "Server configuration error: Missing API Key" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }

    try {
        const data = await request.json() as { photo: string; height: string; weight: string };

        if (!data.photo) {
            return new Response(JSON.stringify({ error: "Missing photo data" }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }

        const systemPrompt = `
You are a high-end fashion director for a luxury magazine.
Your goal is to analyze the user's photo and physical attributes to create a personalized "Style Vibes" report.

Output MUST be a valid JSON object with the following schema:
{
  "vibe_title": "string (e.g., Romantic Urban Chic, Soft Office Siren)",
  "vibe_description": "string (2 sentences describing the style vibe in a sophisticated, magazine-editorial tone)",
  "verdict_quote": "string (A punchy, one-sentence fashion verdict)",
  "attributes": {
    "base": "string (e.g., Silk & Wool, Denim & Leather)",
    "energy": "string (e.g., Sophisticated, Playful, Edgy)",
    "season": "string (e.g., Summer Mute, Deep Autumn)"
  },
  "body_analysis": {
    "type": "string (e.g., Hourglass, Rectangle)",
    "description": "string (1 sentence explaining why)",
    "rec_silhouette": "string (e.g., High-waist wide pants)",
    "rec_silhouette_desc": "string (Why this silhouette works)"
  },
  "palette": {
    "season": "string (Same as attributes.season)",
    "description": "string (Color analysis description)",
    "colors": [
        { "hex": "string (Hex Code)", "name": "string (Color Name, e.g. Midnight Blue)" },
        { "hex": "string (Hex Code)", "name": "string (Color Name)" },
        { "hex": "string (Hex Code)", "name": "string (Color Name)" },
        { "hex": "string (Hex Code)", "name": "string (Color Name)" },
        { "hex": "string (Hex Code)", "name": "string (Color Name)" }
    ] 
  },
  "grooming": {
    "makeup_lip": "string (e.g., Ashy Lavender)",
    "makeup_desc": "string (Description of the makeup look)"
  },
  "hair_analysis": {
    "face_shape": "string (e.g. Oval, Square, Heart)",
    "advice": "string (Professional advice on why this cut works)",
    "dalle_prompt": "string (DALL-E prompt for: A photorealistic 3x3 grid hair catalog featuring 9 variations of [Recommended Style]. High-end salon photography, studio lighting. The model has [User's Ethnicity/Features].)"
  },
  "lookbook": [
    {
      "title": "string (Concept Title, e.g., The Executive)",
      "description": "string (Description of the outfit)",
      "search_term": "string (DALL-E prompt to generate this model's look)"
    },
    {
      "title": "string",
      "description": "string",
      "search_term": "string"
    },
    {
      "title": "string",
      "description": "string",
      "search_term": "string"
    }
  ],
  "shopping_keywords": [
    {
        "category": "string (e.g. Tailoring)",
        "name": "string (e.g. Oversized Blazer)",
        "description": "string (Why this item)",
        "price": "string (Estimated price, e.g. $249)",
        "query": "string (Search query for Bing, e.g. Charcoal Oversized Wool Blazer women fashion product)" 
    },
    { "category": "string", "name": "string", "description": "string", "price": "string", "query": "string" },
    { "category": "string", "name": "string", "description": "string", "price": "string", "query": "string" },
    { "category": "string", "name": "string", "description": "string", "price": "string", "query": "string" }
  ]
}
`;

        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${env.OPENAI_API_KEY}`,
            },
            body: JSON.stringify({
                model: "gpt-4o",
                messages: [
                    { role: "system", content: systemPrompt },
                    {
                        role: "user",
                        content: [
                            { type: "text", text: `Height: ${data.height}cm, Weight: ${data.weight}kg. Create a luxury fashion analysis for this user.` },
                            { type: "image_url", image_url: { url: data.photo } },
                        ],
                    },
                ],
                response_format: { type: "json_object" },
            }),
        });

        const openaiData = await response.json() as any;

        if (openaiData.error) {
            console.error("OpenAI Error:", openaiData.error);
            throw new Error(openaiData.error.message);
        }

        const content = openaiData.choices?.[0]?.message?.content;
        if (!content) throw new Error("No content from OpenAI");

        const analysisResult = JSON.parse(content);

        // --- Image Generation Logic (DALL-E 3) ---
        const generateImage = async (prompt: string): Promise<string | null> => {
            try {
                const imgResponse = await fetch("https://api.openai.com/v1/images/generations", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${env.OPENAI_API_KEY}`,
                    },
                    body: JSON.stringify({
                        model: "dall-e-3",
                        prompt: `Professional high-end fashion photography. ${prompt} 8k resolution, magazine quality.`,
                        n: 1,
                        size: "1024x1024",
                        quality: "standard",
                    }),
                });
                const imgData = await imgResponse.json() as any;
                if (!imgResponse.ok) return null;
                return imgData.data?.[0]?.url || null;
            } catch (e) {
                return null;
            }
        };

        // Generate images: 3 Lookbook concepts + 1 Hair Grid
        const lookbookPromises = analysisResult.lookbook.map((look: any) => generateImage(look.search_term));
        const hairPromise = generateImage(analysisResult.hair_analysis.dalle_prompt);

        const [generatedImages, hairImage] = await Promise.all([
            Promise.all(lookbookPromises),
            hairPromise
        ]);

        // Assign images back to result
        analysisResult.lookbook.forEach((look: any, index: number) => {
            look.imageUrl = generatedImages[index];
        });
        analysisResult.hair_analysis.imageUrl = hairImage;

        return new Response(JSON.stringify(analysisResult), {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
        });

    } catch (err: any) {
        return new Response(JSON.stringify({ error: err.message }), {
            status: 500,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
        });
    }
};
