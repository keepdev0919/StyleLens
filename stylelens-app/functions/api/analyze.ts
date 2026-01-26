
interface Env {
    OPENAI_API_KEY: string;
    PEXELS_API_KEY: string;
    REPLICATE_API_TOKEN: string;
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
        const data = await request.json() as { photo: string; height: string; weight: string; gender: string };

        if (!data.photo) {
            return new Response(JSON.stringify({ error: "Missing photo data" }), {
                status: 400,
                headers: { "Content-Type": "application/json" },
            });
        }

        const systemPrompt = `
You are a high-end fashion director for a luxury magazine.
Your goal is to analyze the user's photo and physical attributes to create a personalized "Style Vibes" report.
The user identifies as ${data.gender || 'not specified'}. Provide professional advice tailored to this identity.

Output MUST be a valid JSON object with the following schema:
{
  "hero_section": {
    "vibe_title": "Short title describing the style vibe",
    "attributes": {
        "base": "Core materials or fabrics",
        "energy": "The psychological or emotional vibe",
        "season": "The most suitable personal color season"
    }
  },
  "analysis_grid": {
    "body_type": "Specific body shape classification",
    "body_description": "Brief explanation of analysis",
    "rec_silhouette": "Recommended clothing silhouette",
    "rec_silhouette_desc": "Why this works for body type",
    "personal_color_season": "Same as hero_section.attributes.season",
    "makeup_lip": "Recommended lip color",
    "makeup_desc": "Description of the makeup look"
  },
  "lookbook_section": [
    {
      "title": "Concept Title",
      "description": "Description of the outfit",
      "pexels_query": "Fashion search query for Pexels"
    },
    { "title": "string", "description": "string", "pexels_query": "string" },
    { "title": "string", "description": "string", "pexels_query": "string" }
  ],
  "hair_section": {
    "face_shape": "One of: Oval, Round, Square, Heart, Oblong, Diamond, Triangle",
    "advice": "Professional advice on the hairstyle",
    "tags": ["Keyword1", "Keyword2", "Keyword3"]
  },
  "shopping_section": [
    {
        "category": "Item category",
        "name": "Item name",
        "description": "Why this fits the user",
        "pexels_query": "Product search query for Pexels" 
    },
    { "category": "string", "name": "string", "description": "string", "pexels_query": "string" },
    { "category": "string", "name": "string", "description": "string", "pexels_query": "string" },
    { "category": "string", "name": "string", "description": "string", "pexels_query": "string" }
  ],
  "color_story_section": {
    "vibe_description": "2 sentences of editorial fashion advice",
    "palette_colors": [
        { "hex": "Hex Code", "name": "Color Name", "role": "BASE", "application": "Tops, Bottoms, Everyday Basics" },
        { "hex": "Hex Code", "name": "Color Name", "role": "ACCENT", "application": "Accessories, Bags, Scarves" },
        { "hex": "Hex Code", "name": "Color Name", "role": "STATEMENT", "application": "Coat, Dress, Key Pieces" },
        { "hex": "Hex Code", "name": "Color Name", "role": "LIP", "application": "Lipstick, Blush, Tint" },
        { "hex": "Hex Code", "name": "Color Name", "role": "EYE", "application": "Eyeshadow, Liner, Brow" }
    ]
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
                model: "gpt-4o-mini",
                messages: [
                    { role: "system", content: systemPrompt },
                    {
                        role: "user",
                        content: [
                            { type: "text", text: `Gender: ${data.gender || 'not specified'}, Height: ${data.height}cm, Weight: ${data.weight}kg. Create a luxury fashion analysis for this user.` },
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
        if (!content) {
            console.error("Full OpenAI Response:", JSON.stringify(openaiData, null, 2));
            throw new Error("No content from OpenAI");
        }

        const analysisResult = JSON.parse(content);

        // --- Hybrid Image Sourcing Logic ---

        const searchPexels = async (query: string): Promise<string | null> => {
            if (!env.PEXELS_API_KEY) return "https://placehold.co/600x800?text=No+Pexels+Key";
            try {
                const res = await fetch(`https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=1`, {
                    headers: { "Authorization": env.PEXELS_API_KEY }
                });
                const data = await res.json() as any;
                return data.photos?.[0]?.src?.large || null;
            } catch (e) { return null; }
        };

        const generateReplicateHair = async (userPhoto: string): Promise<string | null> => {
            if (!env.REPLICATE_API_TOKEN) {
                console.error("REPLICATE_API_TOKEN is missing");
                return "https://placehold.co/1024x1024?text=No+Replicate+Key";
            }
            try {
                console.log("Starting Replicate Hair Generation...");

                // 성별에 따른 헤어스타일 프롬프트 분기 처리
                let hairPrompt: string;

                if (data.gender === "woman") {
                    hairPrompt = `Create a 3x3 grid showing exactly these 9 hairstyles for the woman in the attached photo:
1. Long Straight
2. Long Layered
3. Long Wavy
4. Shoulder Length
5. Lob (Long Bob)
6. Classic Bob
7. Short Bob with Bangs
8. Pixie Cut
9. Curtain Bangs with Layers
It is CRITICAL to maintain the exact facial features, face shape, and identity of the person for all 9 images.`;
                } else if (data.gender === "man") {
                    hairPrompt = `Create a 3x3 grid showing exactly these 9 hairstyles for the man in the attached photo:
1. Buzz Cut
2. Crew Cut
3. Two-Block
4. Undercut
5. Side Part
6. Textured Crop
7. Comma Hair
8. Slick Back
9. Medium Wavy
It is CRITICAL to maintain the exact facial features, face shape, and identity of the person for all 9 images.`;
                } else {
                    hairPrompt = `Create a 3x3 grid showing 9 different hairstyles for the person in the attached photo. It is CRITICAL to maintain the exact facial features, face shape, and identity of the person for all 9 images.`;
                }

                const res = await fetch("https://api.replicate.com/v1/models/qwen/qwen-image-edit-2511/predictions", {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${env.REPLICATE_API_TOKEN}`,
                        "Content-Type": "application/json",
                        "Prefer": "wait"
                    },
                    body: JSON.stringify({
                        input: {
                            prompt: hairPrompt,
                            image: [userPhoto],
                            go_fast: true,
                            aspect_ratio: "1:1",
                            output_format: "webp",
                            output_quality: 95
                        }
                    })
                });

                let prediction = await res.json() as any;

                if (!res.ok || prediction.error) {
                    console.error("Replicate API POST Failure:", {
                        httpStatus: res.status,
                        error: prediction.error,
                        detail: prediction.detail,
                        prediction: prediction
                    });
                    return null;
                }

                // Polling logic: Replicate heavy models take time.
                // Cloudflare workers have a total timeout (usually 30s), so we poll up to ~25s.
                let attempts = 0;
                const maxAttempts = 7; // ~21 seconds total polling time

                while (prediction.status !== "succeeded" && prediction.status !== "failed" && attempts < maxAttempts) {
                    console.log(`Polling Replicate... Status: ${prediction.status}, Attempt: ${attempts + 1}, ID: ${prediction.id}`);
                    await new Promise(resolve => setTimeout(resolve, 3000)); // Wait 3 seconds

                    const pollRes = await fetch(`https://api.replicate.com/v1/predictions/${prediction.id}`, {
                        headers: {
                            "Authorization": `Bearer ${env.REPLICATE_API_TOKEN}`,
                        }
                    });

                    if (!pollRes.ok) {
                        const errorData = await pollRes.json() as any;
                        console.error("Replicate Polling Error:", {
                            httpStatus: pollRes.status,
                            error: errorData
                        });
                        break;
                    }

                    prediction = await pollRes.json();
                    attempts++;
                }

                if (prediction.status === "succeeded") {
                    console.log("Replicate Generation Succeeded successfully.");
                    if (Array.isArray(prediction.output)) return prediction.output[0];
                    return prediction.output || null;
                } else {
                    console.error("Replicate Generation Failed or Timed out:", {
                        status: prediction.status,
                        id: prediction.id,
                        error: prediction.error
                    });
                    return null;
                }
            } catch (e) {
                console.error("Exception in generateReplicateHair:", e);
                return null;
            }
        };

        // Parallel Sourcing
        const lookbookPromises = analysisResult.lookbook_section.map((look: any) => searchPexels(look.pexels_query));
        const shoppingPromises = analysisResult.shopping_section.map((item: any) => searchPexels(item.pexels_query));
        const hairPromise = generateReplicateHair(data.photo);

        const [lookbookImages, shoppingImages, hairImage] = await Promise.all([
            Promise.all(lookbookPromises),
            Promise.all(shoppingPromises),
            hairPromise
        ]);

        // Assign back to result
        analysisResult.lookbook_section.forEach((look: any, i: number) => { look.imageUrl = lookbookImages[i]; });
        analysisResult.shopping_section.forEach((item: any, i: number) => { item.imageUrl = shoppingImages[i]; });
        analysisResult.hair_section.imageUrl = hairImage;

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
