import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useSettings } from '../context/SettingsContext';
import { t } from '../i18n';
import { useDocumentMeta } from '../hooks/useDocumentMeta';

export default function RefundPage() {
    const { language } = useSettings();
    useDocumentMeta('refund');

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

                        <h1 className="text-4xl lg:text-5xl font-bold mb-4">Refund Policy</h1>
                        <p className="text-gray-500 mb-12">Last updated: January 2025</p>

                        {language === 'ko' && (
                            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
                                <p className="text-yellow-800 font-medium">{t(language, 'legal.englishOnly')}</p>
                            </div>
                        )}

                        <div className="prose prose-lg max-w-none">
                            <section className="mb-10">
                                <h2 className="text-2xl font-bold mb-4">Overview</h2>
                                <p className="text-gray-600 leading-relaxed mb-4">
                                    At StyleLens, we want you to be completely satisfied with your style analysis.
                                    This Refund Policy outlines the terms and conditions for refund requests.
                                </p>
                            </section>

                            <section className="mb-10">
                                <h2 className="text-2xl font-bold mb-4">Digital Product Nature</h2>
                                <p className="text-gray-600 leading-relaxed mb-4">
                                    StyleLens provides a digital service that delivers AI-generated style analysis
                                    immediately upon payment. Due to the instant delivery nature of our digital product,
                                    refunds are handled on a case-by-case basis.
                                </p>
                            </section>

                            <section className="mb-10">
                                <h2 className="text-2xl font-bold mb-4">Eligible Refund Situations</h2>
                                <p className="text-gray-600 leading-relaxed mb-4">
                                    You may be eligible for a refund in the following situations:
                                </p>
                                <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                                    <li><strong>Technical failure:</strong> If the service fails to generate your analysis due to technical issues on our end</li>
                                    <li><strong>Duplicate charge:</strong> If you were accidentally charged multiple times for the same analysis</li>
                                    <li><strong>Service not delivered:</strong> If you did not receive your style analysis after payment was processed</li>
                                </ul>
                            </section>

                            <section className="mb-10">
                                <h2 className="text-2xl font-bold mb-4">Non-Refundable Situations</h2>
                                <p className="text-gray-600 leading-relaxed mb-4">
                                    Refunds are generally not provided in the following cases:
                                </p>
                                <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                                    <li>Dissatisfaction with AI-generated recommendations (subjective preferences)</li>
                                    <li>Change of mind after the analysis has been delivered</li>
                                    <li>Uploading incorrect photos or providing inaccurate information</li>
                                    <li>Failure to download or save your results before they expire</li>
                                </ul>
                            </section>

                            <section className="mb-10">
                                <h2 className="text-2xl font-bold mb-4">How to Request a Refund</h2>
                                <p className="text-gray-600 leading-relaxed mb-4">
                                    To request a refund, please contact us within 7 days of your purchase:
                                </p>
                                <ol className="list-decimal list-inside text-gray-600 space-y-2 ml-4">
                                    <li>Email us at <a href="mailto:keepdev0919@gmail.com" className="text-primary hover:underline">keepdev0919@gmail.com</a></li>
                                    <li>Include your payment confirmation or transaction ID</li>
                                    <li>Describe the reason for your refund request</li>
                                    <li>Provide any relevant screenshots or documentation</li>
                                </ol>
                            </section>

                            <section className="mb-10">
                                <h2 className="text-2xl font-bold mb-4">Refund Processing</h2>
                                <p className="text-gray-600 leading-relaxed mb-4">
                                    Approved refunds will be processed through our payment partner, Polar, and returned
                                    to your original payment method. Please allow:
                                </p>
                                <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                                    <li><strong>Review time:</strong> 3-5 business days for us to review your request</li>
                                    <li><strong>Processing time:</strong> 5-10 business days for the refund to appear on your statement</li>
                                </ul>
                            </section>

                            <section className="mb-10">
                                <h2 className="text-2xl font-bold mb-4">Chargebacks</h2>
                                <p className="text-gray-600 leading-relaxed mb-4">
                                    We encourage you to contact us directly before initiating a chargeback with your
                                    bank or credit card company. We are committed to resolving any issues fairly and
                                    promptly. Initiating a chargeback without first contacting us may result in delays
                                    and additional complications.
                                </p>
                            </section>

                            <section className="mb-10">
                                <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
                                <p className="text-gray-600 leading-relaxed mb-4">
                                    If you have any questions about our Refund Policy or need assistance with a refund
                                    request, please contact us at{' '}
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
