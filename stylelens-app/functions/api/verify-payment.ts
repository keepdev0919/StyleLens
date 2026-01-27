import { Polar } from "@polar-sh/sdk";

interface Env {
    POLAR_ACCESS_TOKEN: string;
    POLAR_SERVER?: "sandbox" | "production";
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
    const { request, env } = context;

    try {
        const url = new URL(request.url);
        const sessionId = url.searchParams.get('session_id');

        if (!sessionId) {
            return new Response(JSON.stringify({
                error: 'Missing session_id parameter',
                verified: false
            }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Initialize Polar SDK
        const polar = new Polar({
            accessToken: env.POLAR_ACCESS_TOKEN,
            server: env.POLAR_SERVER || "production",
        });

        // Get checkout session
        const checkout = await polar.checkouts.get({ id: sessionId });

        // Check payment status (Polar uses 'succeeded' or 'confirmed')
        const isVerified = checkout.status === 'succeeded' || checkout.status === 'confirmed';

        if (!isVerified) {
            return new Response(JSON.stringify({
                error: 'Payment not confirmed',
                status: checkout.status,
                verified: false
            }), {
                status: 402,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Payment verified - return order_id for refund tracking
        return new Response(JSON.stringify({
            verified: true,
            status: checkout.status,
            orderId: (checkout as any).order_id || checkout.id
        }), {
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (error: any) {
        console.error('Payment verification error:', error);
        return new Response(JSON.stringify({
            error: 'Verification failed',
            message: error.message,
            verified: false
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
};
