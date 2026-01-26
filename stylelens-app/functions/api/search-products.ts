interface Env {
    BING_API_KEY: string;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
    const { request, env } = context;
    const url = new URL(request.url);
    const query = url.searchParams.get("q");

    if (!query) {
        return new Response(JSON.stringify({ error: "Missing query parameter 'q'" }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
        });
    }

    const apiKey = env.BING_API_KEY;

    // Fallback for development if no key is set (to prevent crash, return mock)
    if (!apiKey) {
        return new Response(JSON.stringify({
            products: [
                {
                    title: "[MOCK] " + query,
                    imageUrl: "https://placehold.co/400x400/png?text=" + encodeURIComponent(query),
                    thumbnailUrl: "https://placehold.co/150x150/png?text=" + encodeURIComponent(query),
                    sourceUrl: "#"
                }
            ],
            warning: "No BING_API_KEY configured"
        }), {
            headers: { "Content-Type": "application/json" }
        });
    }

    try {
        // Append keywords for better product results
        const refinedQuery = `${query} product photography white background`;
        const bingUrl = `https://api.bing.microsoft.com/v7.0/images/search?q=${encodeURIComponent(refinedQuery)}&count=1&aspect=Square&imageType=Shopping`;

        const response = await fetch(bingUrl, {
            headers: {
                "Ocp-Apim-Subscription-Key": apiKey,
                "Accept-Language": "en-US", // Consistent results
            },
        });

        if (!response.ok) {
            throw new Error(`Bing API Error: ${response.status}`);
        }

        const data: any = await response.json();
        const result = data.value?.[0];

        if (!result) {
            return new Response(JSON.stringify({ products: [] }), {
                headers: { "Content-Type": "application/json" },
            });
        }

        // Transform to our spec
        const product = {
            title: result.name,
            imageUrl: result.contentUrl,
            thumbnailUrl: result.thumbnailUrl,
            sourceUrl: result.hostPageUrl
        };

        return new Response(JSON.stringify({ products: [product] }), {
            headers: { "Content-Type": "application/json" },
        });

    } catch (err: any) {
        return new Response(JSON.stringify({ error: err.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
};
