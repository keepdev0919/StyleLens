import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useSettings } from '../context/SettingsContext';
import { t } from '../i18n';

export default function TermsPage() {
    const { language } = useSettings();

    return (
        <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
            <Header variant="landing" />

            <main className="flex-grow pt-24">
                <section className="px-6 lg:px-20 py-16 lg:py-20">
                    <div className="max-w-[800px] mx-auto">
                        <Link to="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-primary transition-colors mb-8">
                            <span className="material-symbols-outlined text-xl">arrow_back</span>
                            <span className="font-medium">{t(language, 'legal.backToHome')}</span>
                        </Link>

                        <h1 className="text-4xl lg:text-5xl font-bold mb-4">Terms of Service</h1>
                        <p className="text-gray-500 mb-12">Last updated: January 2025</p>

                        {language === 'ko' && (
                            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
                                <p className="text-yellow-800 font-medium">{t(language, 'legal.englishOnly')}</p>
                            </div>
                        )}

                        <div className="prose prose-lg max-w-none">
                            <section className="mb-10">
                                <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
                                <p className="text-gray-600 leading-relaxed mb-4">
                                    By accessing and using StyleLens ("Service"), you agree to be bound by these Terms of Service.
                                    If you do not agree to these terms, please do not use our Service.
                                </p>
                            </section>

                            <section className="mb-10">
                                <h2 className="text-2xl font-bold mb-4">2. Description of Service</h2>
                                <p className="text-gray-600 leading-relaxed mb-4">
                                    StyleLens is an AI-powered personal styling service that provides fashion and grooming
                                    recommendations based on user-uploaded photos and provided information. Our Service includes:
                                </p>
                                <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                                    <li>Personal color palette analysis</li>
                                    <li>AI-generated outfit recommendations</li>
                                    <li>Grooming and hairstyle suggestions</li>
                                    <li>Body proportion analysis</li>
                                </ul>
                            </section>

                            <section className="mb-10">
                                <h2 className="text-2xl font-bold mb-4">3. User Requirements</h2>
                                <p className="text-gray-600 leading-relaxed mb-4">
                                    To use StyleLens, you must:
                                </p>
                                <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                                    <li>Be at least 18 years old or have parental consent</li>
                                    <li>Provide accurate information including photos and measurements</li>
                                    <li>Use the Service for personal, non-commercial purposes only</li>
                                    <li>Not upload inappropriate, offensive, or illegal content</li>
                                </ul>
                            </section>

                            <section className="mb-10">
                                <h2 className="text-2xl font-bold mb-4">4. Payment and Pricing</h2>
                                <p className="text-gray-600 leading-relaxed mb-4">
                                    StyleLens offers a one-time style analysis service for $4.99 USD. Payment is processed
                                    securely through our payment partner, Polar. By making a purchase, you agree to Polar's
                                    terms of service and privacy policy.
                                </p>
                                <p className="text-gray-600 leading-relaxed mb-4">
                                    All prices are in USD and include applicable taxes where required. Prices may change
                                    without prior notice, but changes will not affect orders already placed.
                                </p>
                            </section>

                            <section className="mb-10">
                                <h2 className="text-2xl font-bold mb-4">5. Intellectual Property</h2>
                                <p className="text-gray-600 leading-relaxed mb-4">
                                    All content, features, and functionality of StyleLens, including but not limited to
                                    AI-generated recommendations, design, and branding, are owned by StyleLens and protected
                                    by intellectual property laws.
                                </p>
                                <p className="text-gray-600 leading-relaxed mb-4">
                                    You retain ownership of photos you upload. By using our Service, you grant StyleLens
                                    a limited license to process your photos solely for the purpose of generating your
                                    style analysis.
                                </p>
                            </section>

                            <section className="mb-10">
                                <h2 className="text-2xl font-bold mb-4">6. AI-Generated Content Disclaimer</h2>
                                <p className="text-gray-600 leading-relaxed mb-4">
                                    StyleLens uses artificial intelligence to generate style recommendations. While we
                                    strive for accuracy, AI-generated content is provided for informational and entertainment
                                    purposes only. Results may vary, and we do not guarantee that recommendations will
                                    suit your personal preferences or circumstances.
                                </p>
                            </section>

                            <section className="mb-10">
                                <h2 className="text-2xl font-bold mb-4">7. Limitation of Liability</h2>
                                <p className="text-gray-600 leading-relaxed mb-4">
                                    StyleLens is provided "as is" without warranties of any kind. We are not liable for
                                    any indirect, incidental, or consequential damages arising from your use of the Service.
                                    Our total liability shall not exceed the amount you paid for the Service.
                                </p>
                            </section>

                            <section className="mb-10">
                                <h2 className="text-2xl font-bold mb-4">8. Privacy</h2>
                                <p className="text-gray-600 leading-relaxed mb-4">
                                    Your privacy is important to us. Please review our{' '}
                                    <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>{' '}
                                    to understand how we collect, use, and protect your information.
                                </p>
                            </section>

                            <section className="mb-10">
                                <h2 className="text-2xl font-bold mb-4">9. Modifications to Terms</h2>
                                <p className="text-gray-600 leading-relaxed mb-4">
                                    We reserve the right to modify these Terms at any time. Changes will be effective
                                    immediately upon posting. Your continued use of the Service after changes constitutes
                                    acceptance of the modified Terms.
                                </p>
                            </section>

                            <section className="mb-10">
                                <h2 className="text-2xl font-bold mb-4">10. Contact Us</h2>
                                <p className="text-gray-600 leading-relaxed mb-4">
                                    If you have any questions about these Terms of Service, please contact us at{' '}
                                    <a href="mailto:keepdev0919@gmail.com" className="text-primary hover:underline">
                                        keepdev0919@gmail.com
                                    </a>
                                </p>
                            </section>
                        </div>
                    </div>
                </section>
            </main>

            <Footer variant="landing" />
        </div>
    );
}
