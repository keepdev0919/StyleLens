import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useSettings } from '../context/SettingsContext';
import { t } from '../i18n';
import { useDocumentMeta } from '../hooks/useDocumentMeta';

export default function PrivacyPage() {
    const { language } = useSettings();
    useDocumentMeta('privacy');

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

                        <h1 className="text-4xl lg:text-5xl font-bold mb-4">Privacy Policy</h1>
                        <p className="text-gray-500 mb-12">Last updated: January 2025</p>

                        {language === 'ko' && (
                            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
                                <p className="text-yellow-800 font-medium">{t(language, 'legal.englishOnly')}</p>
                            </div>
                        )}

                        <div className="prose prose-lg max-w-none">
                            <section className="mb-10">
                                <h2 className="text-2xl font-bold mb-4">Introduction</h2>
                                <p className="text-gray-600 leading-relaxed mb-4">
                                    StyleLens ("we," "our," or "us") is committed to protecting your privacy.
                                    This Privacy Policy explains how we collect, use, disclose, and safeguard your
                                    information when you use our AI-powered style analysis service.
                                </p>
                            </section>

                            <section className="mb-10">
                                <h2 className="text-2xl font-bold mb-4">Information We Collect</h2>

                                <h3 className="text-xl font-semibold mb-3 mt-6">Personal Information</h3>
                                <p className="text-gray-600 leading-relaxed mb-4">
                                    When you use StyleLens, we may collect:
                                </p>
                                <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                                    <li><strong>Photos:</strong> Images you upload for style analysis</li>
                                    <li><strong>Physical measurements:</strong> Height and weight information you provide</li>
                                    <li><strong>Payment information:</strong> Processed securely through Polar (we do not store your card details)</li>
                                    <li><strong>Email address:</strong> If you contact us for support</li>
                                </ul>

                                <h3 className="text-xl font-semibold mb-3 mt-6">Automatically Collected Information</h3>
                                <p className="text-gray-600 leading-relaxed mb-4">
                                    We may automatically collect certain information when you visit our website:
                                </p>
                                <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                                    <li>Device type and browser information</li>
                                    <li>IP address and general location</li>
                                    <li>Usage data and interaction with our service</li>
                                </ul>
                            </section>

                            <section className="mb-10">
                                <h2 className="text-2xl font-bold mb-4">How We Use Your Information</h2>
                                <p className="text-gray-600 leading-relaxed mb-4">
                                    We use the collected information to:
                                </p>
                                <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                                    <li>Generate your personalized style analysis using AI</li>
                                    <li>Process your payment through our payment partner, Polar</li>
                                    <li>Provide customer support and respond to inquiries</li>
                                    <li>Improve and optimize our service</li>
                                    <li>Prevent fraud and ensure security</li>
                                </ul>
                            </section>

                            <section className="mb-10">
                                <h2 className="text-2xl font-bold mb-4">AI Processing</h2>
                                <p className="text-gray-600 leading-relaxed mb-4">
                                    Your photos are processed using third-party AI services (OpenAI) to generate
                                    style recommendations. By using our service, you acknowledge that:
                                </p>
                                <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                                    <li>Your photos are transmitted securely to AI providers for analysis</li>
                                    <li>AI-generated content is based on your uploaded images and provided information</li>
                                    <li>We do not use your photos to train AI models</li>
                                </ul>
                            </section>

                            <section className="mb-10">
                                <h2 className="text-2xl font-bold mb-4">Data Retention</h2>
                                <p className="text-gray-600 leading-relaxed mb-4">
                                    We retain your information only for as long as necessary to provide our services:
                                </p>
                                <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                                    <li><strong>Photos:</strong> Temporarily processed and not stored permanently on our servers</li>
                                    <li><strong>Analysis results:</strong> Available for your session; we recommend downloading your results</li>
                                    <li><strong>Payment records:</strong> Retained as required by law and for transaction purposes</li>
                                </ul>
                            </section>

                            <section className="mb-10">
                                <h2 className="text-2xl font-bold mb-4">Data Sharing</h2>
                                <p className="text-gray-600 leading-relaxed mb-4">
                                    We do not sell your personal information. We may share your information with:
                                </p>
                                <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                                    <li><strong>Polar:</strong> Our payment processor, to handle transactions</li>
                                    <li><strong>OpenAI:</strong> To process images and generate style analysis</li>
                                    <li><strong>Service providers:</strong> Who assist in operating our website (e.g., hosting)</li>
                                    <li><strong>Legal authorities:</strong> When required by law or to protect our rights</li>
                                </ul>
                            </section>

                            <section className="mb-10">
                                <h2 className="text-2xl font-bold mb-4">Data Security</h2>
                                <p className="text-gray-600 leading-relaxed mb-4">
                                    We implement appropriate technical and organizational measures to protect your
                                    information, including:
                                </p>
                                <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                                    <li>HTTPS encryption for all data transmission</li>
                                    <li>Secure payment processing through Polar</li>
                                    <li>Limited access to personal information</li>
                                </ul>
                                <p className="text-gray-600 leading-relaxed mt-4">
                                    However, no method of transmission over the Internet is 100% secure, and we
                                    cannot guarantee absolute security.
                                </p>
                            </section>

                            <section className="mb-10">
                                <h2 className="text-2xl font-bold mb-4">Your Rights</h2>
                                <p className="text-gray-600 leading-relaxed mb-4">
                                    Depending on your location, you may have the right to:
                                </p>
                                <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                                    <li>Access the personal information we hold about you</li>
                                    <li>Request correction of inaccurate information</li>
                                    <li>Request deletion of your information</li>
                                    <li>Object to or restrict processing of your information</li>
                                    <li>Data portability</li>
                                </ul>
                                <p className="text-gray-600 leading-relaxed mt-4">
                                    To exercise these rights, please contact us at{' '}
                                    <a href="mailto:keepdev0919@gmail.com" className="text-primary hover:underline">
                                        keepdev0919@gmail.com
                                    </a>
                                </p>
                            </section>

                            <section className="mb-10">
                                <h2 className="text-2xl font-bold mb-4">Cookies</h2>
                                <p className="text-gray-600 leading-relaxed mb-4">
                                    We use essential cookies to ensure our website functions properly. We may also
                                    use analytics cookies to understand how visitors interact with our service.
                                    You can control cookie settings through your browser preferences.
                                </p>
                            </section>

                            <section className="mb-10">
                                <h2 className="text-2xl font-bold mb-4">Children's Privacy</h2>
                                <p className="text-gray-600 leading-relaxed mb-4">
                                    StyleLens is not intended for children under 18 years of age. We do not knowingly
                                    collect personal information from children. If you believe we have collected
                                    information from a child, please contact us immediately.
                                </p>
                            </section>

                            <section className="mb-10">
                                <h2 className="text-2xl font-bold mb-4">Changes to This Policy</h2>
                                <p className="text-gray-600 leading-relaxed mb-4">
                                    We may update this Privacy Policy from time to time. We will notify you of any
                                    changes by posting the new Privacy Policy on this page and updating the "Last
                                    updated" date.
                                </p>
                            </section>

                            <section className="mb-10">
                                <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
                                <p className="text-gray-600 leading-relaxed mb-4">
                                    If you have any questions about this Privacy Policy, please contact us at{' '}
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
