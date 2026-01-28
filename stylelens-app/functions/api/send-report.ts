interface Env {
    RESEND_API_KEY: string;
}

interface AnalysisData {
    hero_section: {
        vibe_title: string;
        attributes: {
            base: string;
            energy: string;
            season: string;
        };
    };
    analysis_grid: {
        body_type: string;
        body_description: string;
        rec_silhouette: string;
        rec_silhouette_desc: string;
        personal_color_season: string;
        makeup_lip: string;
        makeup_desc: string;
    };
    lookbook_section: Array<{
        title: string;
        description: string;
        imageUrl?: string;
    }>;
    hair_section: {
        face_shape: string;
        advice: string;
        tags: string[];
        imageUrl?: string;
    };
    shopping_section: Array<{
        category: string;
        name: string;
        description: string;
        imageUrl?: string;
    }>;
    color_story_section: {
        vibe_description: string;
        palette_colors: Array<{
            hex: string;
            name: string;
            role: string;
            application: string;
        }>;
    };
}

interface RequestBody {
    email: string;
    analysis: AnalysisData;
    userImage?: string;
}

function generateEmailHTML(analysis: AnalysisData): string {
    const { hero_section, analysis_grid, lookbook_section, hair_section, shopping_section, color_story_section } = analysis;

    const paletteColorsHTML = color_story_section.palette_colors.map(color => `
        <td style="text-align: center; padding: 8px;">
            <div style="width: 50px; height: 50px; border-radius: 50%; background-color: ${color.hex}; margin: 0 auto 8px; border: 2px solid #f5f5f5;"></div>
            <p style="margin: 0; font-size: 12px; font-weight: bold; color: #333;">${color.name}</p>
            <p style="margin: 2px 0; font-size: 10px; color: #E91E8C; text-transform: uppercase;">${color.role}</p>
        </td>
    `).join('');

    const lookbookHTML = lookbook_section.map((look, idx) => `
        <div style="margin-bottom: 24px; background: #fafafa; border-radius: 12px; overflow: hidden;">
            ${look.imageUrl ? `<img src="${look.imageUrl}" alt="${look.title}" style="width: 100%; height: 200px; object-fit: cover; display: block;" />` : ''}
            <div style="padding: 20px;">
                <p style="font-size: 10px; color: #E91E8C; text-transform: uppercase; letter-spacing: 2px; margin: 0 0 8px;">Concept ${String(idx + 1).padStart(2, '0')}</p>
                <h3 style="margin: 0 0 8px; font-size: 18px; font-family: Georgia, serif;">${look.title}</h3>
                <p style="margin: 0; font-size: 14px; color: #666; line-height: 1.5;">${look.description}</p>
            </div>
        </div>
    `).join('');

    const shoppingHTML = shopping_section.map(item => `
        <div style="background: #fff; border: 1px solid #f0f0f0; border-radius: 12px; padding: 16px; text-align: center;">
            <p style="font-size: 10px; color: #999; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 4px;">${item.category}</p>
            <h4 style="margin: 0 0 8px; font-size: 16px; font-family: Georgia, serif;">${item.name}</h4>
            <p style="margin: 0; font-size: 12px; color: #666; line-height: 1.4;">${item.description}</p>
        </div>
    `).join('');

    const hairTagsHTML = hair_section.tags.map(tag =>
        `<span style="display: inline-block; padding: 6px 12px; background: #fff; border: 1px solid #fce4ec; border-radius: 20px; font-size: 11px; color: #E91E8C; margin: 4px;">#${tag.replace(/^#/, '')}</span>`
    ).join('');

    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your StyleLens Report</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f8f8f8; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
    <table role="presentation" style="width: 100%; border-collapse: collapse;">
        <tr>
            <td align="center" style="padding: 40px 20px;">
                <table role="presentation" style="width: 100%; max-width: 600px; border-collapse: collapse; background: #fff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08);">

                    <!-- Header -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #1a1a1a 0%, #333 100%); padding: 40px 32px; text-align: center;">
                            <h1 style="margin: 0; font-size: 28px; font-weight: bold; font-style: italic; color: #fff; font-family: Georgia, serif;">
                                Style<span style="color: #E91E8C;">Lens</span>
                            </h1>
                            <p style="margin: 12px 0 0; font-size: 11px; color: rgba(255,255,255,0.6); text-transform: uppercase; letter-spacing: 3px;">Your Personal Style Report</p>
                        </td>
                    </tr>

                    <!-- Hero Section -->
                    <tr>
                        <td style="padding: 40px 32px; text-align: center; border-bottom: 1px solid #f0f0f0;">
                            <p style="margin: 0 0 8px; font-size: 10px; color: #E91E8C; text-transform: uppercase; letter-spacing: 2px;">Your Style Identity</p>
                            <h2 style="margin: 0 0 24px; font-size: 36px; font-family: Georgia, serif; color: #1a1a1a; font-style: italic;">${hero_section.vibe_title}</h2>

                            <table role="presentation" style="width: 100%; border-collapse: collapse;">
                                <tr>
                                    <td style="padding: 12px; text-align: center; border-right: 1px solid #f0f0f0;">
                                        <p style="margin: 0 0 4px; font-size: 10px; color: #E91E8C; text-transform: uppercase; letter-spacing: 1px;">Base</p>
                                        <p style="margin: 0; font-size: 16px; font-weight: bold; font-family: Georgia, serif;">${hero_section.attributes.base}</p>
                                    </td>
                                    <td style="padding: 12px; text-align: center; border-right: 1px solid #f0f0f0;">
                                        <p style="margin: 0 0 4px; font-size: 10px; color: #E91E8C; text-transform: uppercase; letter-spacing: 1px;">Energy</p>
                                        <p style="margin: 0; font-size: 16px; font-weight: bold; font-family: Georgia, serif;">${hero_section.attributes.energy}</p>
                                    </td>
                                    <td style="padding: 12px; text-align: center;">
                                        <p style="margin: 0 0 4px; font-size: 10px; color: #E91E8C; text-transform: uppercase; letter-spacing: 1px;">Season</p>
                                        <p style="margin: 0; font-size: 16px; font-weight: bold; font-family: Georgia, serif;">${hero_section.attributes.season}</p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Analysis Grid -->
                    <tr>
                        <td style="padding: 32px;">
                            <h3 style="margin: 0 0 20px; font-size: 20px; font-family: Georgia, serif; text-align: center;">Style Analysis</h3>

                            <table role="presentation" style="width: 100%; border-collapse: collapse;">
                                <tr>
                                    <td style="padding: 16px; background: #fafafa; border-radius: 12px; vertical-align: top; width: 50%;">
                                        <p style="margin: 0 0 4px; font-size: 10px; color: #999; text-transform: uppercase; letter-spacing: 1px;">Body Type</p>
                                        <p style="margin: 0 0 8px; font-size: 18px; font-weight: bold; font-family: Georgia, serif;">${analysis_grid.body_type}</p>
                                        <p style="margin: 0; font-size: 12px; color: #666; line-height: 1.4;">${analysis_grid.body_description}</p>
                                    </td>
                                    <td style="width: 16px;"></td>
                                    <td style="padding: 16px; background: #fafafa; border-radius: 12px; vertical-align: top; width: 50%;">
                                        <p style="margin: 0 0 4px; font-size: 10px; color: #999; text-transform: uppercase; letter-spacing: 1px;">Color Season</p>
                                        <p style="margin: 0 0 8px; font-size: 18px; font-weight: bold; font-family: Georgia, serif;">${analysis_grid.personal_color_season}</p>
                                        <p style="margin: 0; font-size: 12px; color: #666; line-height: 1.4;">Your perfect palette awaits</p>
                                    </td>
                                </tr>
                                <tr><td colspan="3" style="height: 16px;"></td></tr>
                                <tr>
                                    <td style="padding: 16px; background: #fafafa; border-radius: 12px; vertical-align: top;">
                                        <p style="margin: 0 0 4px; font-size: 10px; color: #999; text-transform: uppercase; letter-spacing: 1px;">Best Silhouette</p>
                                        <p style="margin: 0 0 8px; font-size: 18px; font-weight: bold; font-family: Georgia, serif;">${analysis_grid.rec_silhouette}</p>
                                        <p style="margin: 0; font-size: 12px; color: #666; line-height: 1.4;">${analysis_grid.rec_silhouette_desc}</p>
                                    </td>
                                    <td style="width: 16px;"></td>
                                    <td style="padding: 16px; background: #fafafa; border-radius: 12px; vertical-align: top;">
                                        <p style="margin: 0 0 4px; font-size: 10px; color: #999; text-transform: uppercase; letter-spacing: 1px;">Signature Lip</p>
                                        <p style="margin: 0 0 8px; font-size: 18px; font-weight: bold; font-family: Georgia, serif;">${analysis_grid.makeup_lip}</p>
                                        <p style="margin: 0; font-size: 12px; color: #666; line-height: 1.4;">${analysis_grid.makeup_desc}</p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Lookbook Section -->
                    <tr>
                        <td style="padding: 32px; background: #fff; border-top: 1px solid #f0f0f0;">
                            <h3 style="margin: 0 0 8px; font-size: 20px; font-family: Georgia, serif; text-align: center;">Identity Lookbook</h3>
                            <p style="margin: 0 0 24px; font-size: 11px; color: #999; text-transform: uppercase; letter-spacing: 2px; text-align: center;">AI-Curated Concepts</p>
                            ${lookbookHTML}
                        </td>
                    </tr>

                    <!-- Hair Section -->
                    <tr>
                        <td style="padding: 32px; background: linear-gradient(135deg, #fce4ec 0%, #fff 100%);">
                            <h3 style="margin: 0 0 8px; font-size: 20px; font-family: Georgia, serif; text-align: center;">Your Perfect Cut</h3>
                            <p style="margin: 0 0 24px; font-size: 11px; color: #E91E8C; text-transform: uppercase; letter-spacing: 2px; text-align: center;">Hair Studio Analysis</p>

                            ${hair_section.imageUrl ? `
                            <div style="margin-bottom: 16px; border-radius: 12px; overflow: hidden;">
                                <img src="${hair_section.imageUrl}" alt="Hair Style Recommendations" style="width: 100%; display: block; border-radius: 12px;" />
                            </div>
                            ` : ''}

                            <div style="background: #fff; border-radius: 12px; padding: 20px; margin-bottom: 16px;">
                                <p style="margin: 0 0 4px; font-size: 10px; color: #999; text-transform: uppercase; letter-spacing: 1px;">Face Shape</p>
                                <p style="margin: 0 0 16px; font-size: 24px; font-weight: bold; font-family: Georgia, serif; font-style: italic;">${hair_section.face_shape}</p>
                                <p style="margin: 0; font-size: 14px; color: #666; line-height: 1.6; font-style: italic;">"${hair_section.advice}"</p>
                            </div>

                            <div style="text-align: center;">
                                ${hairTagsHTML}
                            </div>
                        </td>
                    </tr>

                    <!-- Shopping Section -->
                    <tr>
                        <td style="padding: 32px;">
                            <h3 style="margin: 0 0 8px; font-size: 20px; font-family: Georgia, serif; text-align: center;">Must-Have Now</h3>
                            <p style="margin: 0 0 24px; font-size: 11px; color: #999; text-transform: uppercase; letter-spacing: 2px; text-align: center;">Boutique-Curated Essentials</p>

                            <table role="presentation" style="width: 100%; border-collapse: separate; border-spacing: 8px;">
                                <tr>
                                    ${shopping_section.slice(0, 2).map(item => `
                                        <td style="width: 50%; vertical-align: top;">
                                            <div style="background: #fafafa; border-radius: 12px; overflow: hidden; text-align: center;">
                                                ${item.imageUrl ? `<img src="${item.imageUrl}" alt="${item.name}" style="width: 100%; height: 140px; object-fit: cover; display: block;" />` : ''}
                                                <div style="padding: 16px;">
                                                    <p style="font-size: 10px; color: #999; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 4px;">${item.category}</p>
                                                    <h4 style="margin: 0 0 8px; font-size: 14px; font-family: Georgia, serif;">${item.name}</h4>
                                                    <p style="margin: 0; font-size: 11px; color: #666; line-height: 1.4;">${item.description}</p>
                                                </div>
                                            </div>
                                        </td>
                                    `).join('')}
                                </tr>
                                <tr>
                                    ${shopping_section.slice(2, 4).map(item => `
                                        <td style="width: 50%; vertical-align: top;">
                                            <div style="background: #fafafa; border-radius: 12px; overflow: hidden; text-align: center;">
                                                ${item.imageUrl ? `<img src="${item.imageUrl}" alt="${item.name}" style="width: 100%; height: 140px; object-fit: cover; display: block;" />` : ''}
                                                <div style="padding: 16px;">
                                                    <p style="font-size: 10px; color: #999; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 4px;">${item.category}</p>
                                                    <h4 style="margin: 0 0 8px; font-size: 14px; font-family: Georgia, serif;">${item.name}</h4>
                                                    <p style="margin: 0; font-size: 11px; color: #666; line-height: 1.4;">${item.description}</p>
                                                </div>
                                            </div>
                                        </td>
                                    `).join('')}
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Color Palette -->
                    <tr>
                        <td style="padding: 32px; background: #fafafa;">
                            <h3 style="margin: 0 0 8px; font-size: 20px; font-family: Georgia, serif; text-align: center;">
                                ${hero_section.attributes.season} <span style="color: #E91E8C; font-style: italic;">Color Story</span>
                            </h3>
                            <p style="margin: 0 0 24px; font-size: 13px; color: #666; text-align: center; line-height: 1.5;">${color_story_section.vibe_description}</p>

                            <table role="presentation" style="width: 100%; border-collapse: collapse;">
                                <tr>
                                    ${paletteColorsHTML}
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="background: #1a1a1a; padding: 32px; text-align: center;">
                            <h2 style="margin: 0 0 8px; font-size: 20px; font-weight: bold; font-style: italic; color: #fff; font-family: Georgia, serif;">
                                Style<span style="color: #E91E8C;">Lens</span>
                            </h2>
                            <p style="margin: 0 0 20px; font-size: 11px; color: rgba(255,255,255,0.5);">Discover Your Unique Style Identity</p>
                            <p style="margin: 0; font-size: 10px; color: rgba(255,255,255,0.3);">
                                This report was generated by StyleLens AI.<br>
                                &copy; ${new Date().getFullYear()} StyleLens. All rights reserved.
                            </p>
                        </td>
                    </tr>

                </table>
            </td>
        </tr>
    </table>
</body>
</html>
`;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
    const { request, env } = context;

    // Handle CORS preflight
    if (request.method === "OPTIONS") {
        return new Response(null, {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "POST, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type",
            },
        });
    }

    // Check for Resend API key
    if (!env.RESEND_API_KEY) {
        return new Response(JSON.stringify({ error: "Server configuration error: Missing Resend API Key" }), {
            status: 500,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
        });
    }

    try {
        const body = await request.json() as RequestBody;
        const { email, analysis } = body;

        // Validate email
        if (!email || !email.includes('@')) {
            return new Response(JSON.stringify({ error: "Valid email address is required" }), {
                status: 400,
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
            });
        }

        // Validate analysis data
        if (!analysis || !analysis.hero_section) {
            return new Response(JSON.stringify({ error: "Analysis data is required" }), {
                status: 400,
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
            });
        }

        // Generate email HTML
        const htmlContent = generateEmailHTML(analysis);

        // Send email via Resend API
        const resendResponse = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${env.RESEND_API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                from: "StyleLens <noreply@stylelens.store>",
                to: [email],
                subject: `Your StyleLens Report: ${analysis.hero_section.vibe_title}`,
                html: htmlContent,
            }),
        });

        const resendData = await resendResponse.json() as any;

        if (!resendResponse.ok) {
            console.error("Resend API Error:", resendData);
            return new Response(JSON.stringify({
                error: resendData.message || "Failed to send email"
            }), {
                status: resendResponse.status,
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
            });
        }

        return new Response(JSON.stringify({
            success: true,
            message: "Report sent successfully!",
            id: resendData.id
        }), {
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
        });

    } catch (err: any) {
        console.error("Send report error:", err);
        return new Response(JSON.stringify({ error: err.message || "Failed to send report" }), {
            status: 500,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
        });
    }
};
