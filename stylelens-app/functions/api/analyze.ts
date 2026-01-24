
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
You are a helpful and positive fashion stylist assistant.
Your goal is to suggest fashion styles, color palettes, and grooming tips based on the visual attributes in the photo.
Focus on clothing, general style vibes (e.g., casual, formal), and color theory.

IMPORTANT: Do not perform any medical, biometric, or sensitive physical analysis. Do not make negative comments.
Simply provide style recommendations in the requested JSON format.

JSON Schema:
{
  "palette": {
    "season": "string (e.g., Cool Summer, Deep Autumn)",
    "description": "string (1-2 sentences explaining why this fits)",
    "colors": [
      { "name": "string (e.g., Imperial Navy)", "hex": "string (e.g., #0F172A)" } // Provide 8 colors
    ]
  },
  "outfits": [
    {
      "title": "string (e.g., Modern Executive)",
      "description": "string (1 sentence)",
      "styleTag": "string (e.g., Business Edge)"
    },
    // Generate 2 outfits
  ],
  "grooming": {
    "faceShape": "string (e.g., Diamond, Oval - estimated for hairstyle advice)",
    "refinementLevel": "string (e.g., Polished)",
    "tips": [
      { "title": "string", "description": "string" },
      { "title": "string", "description": "string" }
    ]
  },
  "bodyAnalysis": {
    "upperBodyRatio": { "label": "string", "score": number (0-100) },
    "stanceSymmetry": { "label": "string", "score": number (0-100) },
    "colorAdaptability": { "label": "string", "score": number (0-100) },
    "comment": "string (positive comment about style potential)"
  }
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
                            { type: "text", text: `Height: ${data.height}cm, Weight: ${data.weight}kg. Analyze this user.` },
                            { type: "image_url", image_url: { url: data.photo } },
                        ],
                    },
                ],
                response_format: { type: "json_object" },
            }),
        });

        const openaiData = await response.json() as any;
        console.log("DEBUG: OpenAI Raw Status:", response.status);
        console.log("DEBUG: OpenAI Raw Data:", JSON.stringify(openaiData, null, 2));

        if (openaiData.error) {
            console.error("OpenAI Error:", openaiData.error);
            throw new Error(openaiData.error.message);
        }

        const content = openaiData.choices?.[0]?.message?.content;
        console.log("DEBUG: Extracted Content:", content);

        if (!content) {
            throw new Error("OpenAI returned empty content. Partial data: " + JSON.stringify(openaiData));
        }

        const analysisResult = JSON.parse(content);

        if (!analysisResult || typeof analysisResult !== 'object') {
            console.error("Invalid AI response:", openaiData.choices[0].message.content);
            throw new Error("Failed to generate valid analysis");
        }

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
                        prompt: prompt,
                        n: 1,
                        size: "1024x1024",
                        quality: "standard",
                    }),
                });
                const imgData = await imgResponse.json() as any;
                if (!imgResponse.ok) {
                    console.error("DALL-E Error:", imgData);
                    return null;
                }
                return imgData.data?.[0]?.url || null;
            } catch (e) {
                console.error("Image gen failed:", e);
                return null;
            }
        };

        // Construct Prompts (Lookalike approach)
        // We assume the user is male based on context for MVP.
        const season = analysisResult.palette?.season || "Unknown";
        const faceShape = analysisResult.grooming?.faceShape || "Unknown";
        const userLook = `${faceShape} face shape, ${season} color season, male fashion model`;

        const imagePromises = [
            // Outfit 1
            generateImage(`Full body fashion shot of a model with ${userLook} wearing ${analysisResult.outfits?.[0]?.title || 'Stylish Outfit'}: ${analysisResult.outfits?.[0]?.description || ''}. High-end commercial photography, studio lighting.`),
            // Outfit 2
            generateImage(`Full body fashion shot of a model with ${userLook} wearing ${analysisResult.outfits?.[1]?.title || 'Stylish Outfit'}: ${analysisResult.outfits?.[1]?.description || ''}. Street style photography, natural lighting.`),
            // Grooming 1 (Hairstyle)
            generateImage(`Close-up portrait of a model with ${userLook} featuring hairstyle: ${analysisResult.grooming?.tips?.[0]?.title || 'Hairstyle'}. High-end beauty photography, sharp focus on hair.`),
            // Grooming 2 (Hairstyle/Skincare)
            generateImage(`Close-up portrait of a model with ${userLook} featuring style: ${analysisResult.grooming?.tips?.[1]?.title || 'Style'}. High-end beauty photography.`),
        ];

        const [outfit1Url, outfit2Url, tip1Url, tip2Url] = await Promise.all(imagePromises);

        if (analysisResult.outfits?.[0]) analysisResult.outfits[0].imageUrl = outfit1Url;
        if (analysisResult.outfits?.[1]) analysisResult.outfits[1].imageUrl = outfit2Url;
        if (analysisResult.grooming?.tips?.[0]) analysisResult.grooming.tips[0].imageUrl = tip1Url;
        if (analysisResult.grooming?.tips?.[1]) analysisResult.grooming.tips[1].imageUrl = tip2Url;

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
