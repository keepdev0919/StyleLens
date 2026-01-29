import { useEffect } from 'react';
import { useSettings } from '../context/SettingsContext';

interface MetaOptions {
    titleKey?: string;
    descriptionKey?: string;
    title?: string;
    description?: string;
    noIndex?: boolean;
}

const titles: Record<string, Record<string, string>> = {
    en: {
        landing: 'StyleLens | AI-Powered Personal Fashion & Style Analysis',
        input: 'Start Your Style Analysis | StyleLens',
        result: 'Your Style Report | StyleLens',
        terms: 'Terms of Service | StyleLens',
        privacy: 'Privacy Policy | StyleLens',
        refund: 'Refund Policy | StyleLens',
    },
    ko: {
        landing: 'StyleLens | AI 패션 & 스타일 분석',
        input: '스타일 분석 시작 | StyleLens',
        result: '내 스타일 리포트 | StyleLens',
        terms: '이용약관 | StyleLens',
        privacy: '개인정보 처리방침 | StyleLens',
        refund: '환불 정책 | StyleLens',
    },
};

const descriptions: Record<string, Record<string, string>> = {
    en: {
        landing: 'Discover your perfect style with AI-powered fashion analysis. Get personalized color palette, body type analysis, and curated outfit suggestions.',
        input: 'Upload your photo and measurements to receive personalized AI-powered style recommendations tailored to your unique features.',
        result: 'Your personalized style analysis with color palette, body type insights, hairstyle recommendations, and curated outfit suggestions.',
        terms: 'Terms of Service for StyleLens AI-powered personal styling service.',
        privacy: 'Privacy Policy - Learn how StyleLens protects and handles your personal information.',
        refund: 'Refund Policy for StyleLens digital style analysis service.',
    },
    ko: {
        landing: 'AI 패션 분석으로 나만의 스타일을 발견하세요. 퍼스널 컬러, 체형 분석, 맞춤 코디 추천을 받아보세요.',
        input: '사진과 신체 정보를 입력하고 AI 기반 맞춤 스타일 추천을 받아보세요.',
        result: '퍼스널 컬러, 체형 분석, 헤어스타일 추천, 맞춤 코디가 담긴 나만의 스타일 리포트.',
        terms: 'StyleLens AI 스타일링 서비스 이용약관.',
        privacy: '개인정보 처리방침 - StyleLens의 개인정보 보호 및 처리 방식을 안내합니다.',
        refund: 'StyleLens 디지털 스타일 분석 서비스 환불 정책.',
    },
};

export function useDocumentMeta(pageKey: string, options: MetaOptions = {}) {
    const { language } = useSettings();

    useEffect(() => {
        // Set title
        const title = options.title || titles[language]?.[pageKey] || titles.en[pageKey];
        if (title) {
            document.title = title;
        }

        // Set description
        const description = options.description || descriptions[language]?.[pageKey] || descriptions.en[pageKey];
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription && description) {
            metaDescription.setAttribute('content', description);
        }

        // Set og:title
        const ogTitle = document.querySelector('meta[property="og:title"]');
        if (ogTitle && title) {
            ogTitle.setAttribute('content', title);
        }

        // Set og:description
        const ogDescription = document.querySelector('meta[property="og:description"]');
        if (ogDescription && description) {
            ogDescription.setAttribute('content', description);
        }

        // Set twitter:title
        const twitterTitle = document.querySelector('meta[name="twitter:title"]');
        if (twitterTitle && title) {
            twitterTitle.setAttribute('content', title);
        }

        // Set twitter:description
        const twitterDescription = document.querySelector('meta[name="twitter:description"]');
        if (twitterDescription && description) {
            twitterDescription.setAttribute('content', description);
        }

        // Set robots meta for noIndex pages
        const robotsMeta = document.querySelector('meta[name="robots"]');
        if (robotsMeta) {
            robotsMeta.setAttribute('content', options.noIndex ? 'noindex, nofollow' : 'index, follow');
        }

        // Update html lang attribute
        document.documentElement.lang = language;

    }, [pageKey, language, options.title, options.description, options.noIndex]);
}
