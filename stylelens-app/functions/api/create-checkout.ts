
import { Polar } from "@polar-sh/sdk";

interface Env {
    POLAR_ACCESS_TOKEN: string;
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
            server: "production", // Default to sandbox for dev, change to production based on env if needed
        });

        const { successUrl } = await request.json() as { successUrl?: string };

        // Determine embed origin from request headers or environment
        const origin = request.headers.get("Origin") || "http://localhost:5173";
        const finalSuccessUrl = successUrl || `${origin}/input?payment=success`;

        const result = await polar.checkouts.create({
            products: ["e1403b39-214e-427d-863c-0dbea81cc9d9"],
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
