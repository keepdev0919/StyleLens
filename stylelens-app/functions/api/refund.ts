import { Polar } from "@polar-sh/sdk";

interface Env {
    POLAR_ACCESS_TOKEN: string;
    POLAR_SERVER?: "sandbox" | "production";
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
    const { request, env } = context;

    try {
        const { orderId, reason } = await request.json() as {
            orderId: string;
            reason?: string;
        };

        if (!orderId) {
            return new Response(JSON.stringify({
                error: 'Missing orderId'
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

        // Get checkout to find order
        const checkout = await polar.checkouts.get({ id: orderId });

        if (!checkout) {
            return new Response(JSON.stringify({
                error: 'Checkout not found',
                refunded: false
            }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Get order amount from checkout
        const amount = checkout.amount;

        // Process refund
        await polar.refunds.create({
            orderId: orderId,
            amount: amount,
            reason: 'other',
            comment: reason || 'Analysis failed',
        });

        console.log(`Successfully refunded checkout ${orderId}`);

        return new Response(JSON.stringify({
            success: true,
            refunded: true,
            amount: amount
        }), {
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (error: any) {
        console.error('Refund error:', error);
        return new Response(JSON.stringify({
            error: 'Refund failed',
            message: error.message,
            refunded: false
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
};
