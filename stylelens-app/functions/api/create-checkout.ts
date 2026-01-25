
import { Polar } from "@polar-sh/sdk";

interface Env {
    POLAR_ACCESS_TOKEN: string;
    POLAR_SERVER?: "sandbox" | "production";
    POLAR_PRODUCT_ID: string;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
    const { request, env } = context;

    try {
        const token = env.POLAR_ACCESS_TOKEN as string;
        if (!token) {
            return new Response(JSON.stringify({ error: "Missing POLAR_ACCESS_TOKEN" }), {
                status: 500,
                headers: { "Content-Type": "application/json" },
            });
        }

        const polar = new Polar({
            accessToken: token,
            server: env.POLAR_SERVER || "production",
        });

        const { successUrl } = await request.json() as { successUrl?: string };

        // Determine embed origin from request headers or environment
        const origin = request.headers.get("Origin") || "http://localhost:5173";
        const finalSuccessUrl = successUrl || `${origin}/input?payment=success`;

        const productId = env.POLAR_PRODUCT_ID;
        if (!productId) {
            return new Response(JSON.stringify({ error: "Missing POLAR_PRODUCT_ID" }), {
                status: 500,
                headers: { "Content-Type": "application/json" },
            });
        }

        const result = await polar.checkouts.create({
            products: [productId],
            successUrl: finalSuccessUrl,
        });

        return new Response(JSON.stringify(result), {
            headers: { "Content-Type": "application/json" },
        });

    } catch (error) {
        console.error("Polar Checkout Error:", error);
        return new Response(JSON.stringify({ error: "Failed to create checkout session" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
};
