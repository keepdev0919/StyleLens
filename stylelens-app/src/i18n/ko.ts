import type { TranslationKey } from './en';

export const ko: Record<TranslationKey, string> = {
    // Landing - Hero
    'landing.hero.title1': '나만의',
    'landing.hero.title2': '완벽한 룩을 찾아보세요',
    'landing.hero.title3': 'StyleLens',
    'landing.hero.subtitle': 'AI 기반 패션 및 그루밍 분석으로 당신만의 스타일을 발견하세요.',
    'landing.cta': '스타일 여정 시작하기',
    'landing.trust': '스타일링 커뮤니티에 참여하세요',

    // Landing - Hero Badge
    'landing.hero.badge.label': '매치 점수',
    'landing.hero.badge.value': '세련된 시크',

    // Landing - Testimonials
    'landing.testimonials.badge': '성공 사례',
    'landing.testimonials.title': '사용자 변신 스토리',

    // Landing - How it Works
    'landing.howItWorks.title': 'StyleLens 방법론',
    'landing.howItWorks.subtitle': '최첨단 인공지능으로 당신의 룩을 재정의하는 간단한 3단계.',
    'landing.howItWorks.step1.title': '사진 업로드',
    'landing.howItWorks.step1.desc': '사진을 안전하게 업로드하고 스타일 목표를 AI 어시스턴트와 공유하세요.',
    'landing.howItWorks.step2.title': '뉴럴 분석',
    'landing.howItWorks.step2.desc': '엔진이 당신의 특징, 컬러 팔레트, 비율을 최신 패션 지표와 비교 분석합니다.',
    'landing.howItWorks.step3.title': '맞춤 추천',
    'landing.howItWorks.step3.desc': '당신만을 위해 제작된 맞춤형 디지털 스타일북과 그루밍 가이드를 받아보세요.',

    // Landing - CTA Section
    'landing.ctaSection.title1': '당신의 미학을',
    'landing.ctaSection.title2': '한 단계 높일 준비가 되셨나요?',
    'landing.ctaSection.subtitle': 'AI 기반 패션 분석으로 당신만의 스타일을 발견하세요.',
    'landing.ctaSection.footer': '오늘 당신의 잠재력을 발견하세요.',

    // Input Page
    'input.title1': '당신에 대해',
    'input.title2': '알려주세요',
    'input.subtitle': '사진과 신체 정보를 공유하여 맞춤형 스타일 추천을 받아보세요.',
    'input.photo.label': '사진',
    'input.photo.upload': '사진 업로드하기',
    'input.photo.hint': '최상의 결과를 위해 정면 사진을 업로드해주세요',
    'input.gender.label': '성별 / 정체성',
    'input.gender.female': '여성',
    'input.gender.male': '남성',
    'input.gender.other': '기타',
    'input.gender.placeholder': '어떻게 묘사되길 원하시나요? (예: 논바이너리, 중성적)',
    'input.height.label': '키',
    'input.height.cm': 'cm',
    'input.height.ft': 'ft',
    'input.height.in': 'in',
    'input.height.placeholder.cm': '예: 175',
    'input.height.placeholder.ft': 'ft',
    'input.height.placeholder.in': 'in',
    'input.weight.label': '몸무게',
    'input.weight.kg': 'kg',
    'input.weight.lbs': 'lbs',
    'input.weight.placeholder.kg': '예: 70',
    'input.weight.placeholder.lbs': '예: 154',
    'input.submit': '내 스타일 분석하기',
    'input.processing': '처리 중...',
    'input.unitToggle.metric': 'Metric',
    'input.unitToggle.imperial': 'Imperial',

    // Input - Verifying / Loading
    'input.verifying.title': '결제 확인 중...',
    'input.verifying.subtitle': '잠시만 기다려주세요',
    'input.loading.title': '스타일 분석 중',
    'input.loading.subtitle': 'AI 스타일리스트에게 문의 중...',

    // Input - Alerts
    'alert.photoRequired': '사진을 먼저 업로드해주세요.',
    'alert.paymentFailed': '결제 확인에 실패했습니다. 고객 지원에 문의해주세요.',
    'alert.sessionExpired': '세션이 만료되었습니다. 다시 시도해주세요.',
    'alert.checkoutFailed': '결제를 시작하지 못했습니다. 다시 시도해주세요.',

    // Result Page - Loading
    'result.loading.title': '커버 디자인 중...',
    'result.loading.subtitle': '비율 & 바이브 분석 중',
    'result.loading.hint': '맞춤형 룩북 제작에 최대 30초가 소요될 수 있습니다.',
    'result.loading.warning': '이 창을 닫지 마세요.',

    // Result Page - Error
    'result.error.title': '분석 오류',
    'result.error.refunded.title': '결제 자동 환불 완료',
    'result.error.refunded.desc': '결제가 자동으로 환불되었습니다. 3-5 영업일 이내에 계좌에서 확인하실 수 있습니다.',
    'result.error.retry': '분석 재시도',
    'result.error.return': '입력 페이지로 돌아가기',

    // Result Page - Actions
    'result.share': '리포트 공유',
    'result.download': '스타일북 다운로드',
    'result.download.pdf': 'PDF로 저장',
    'result.download.image': '이미지로 저장',
    'result.generating': '생성 중...',

    // Result Page - Toast
    'result.toast.pdf': 'PDF 생성 중...',
    'result.toast.pdfDone': 'PDF가 성공적으로 다운로드되었습니다!',
    'result.toast.pdfFail': 'PDF 생성에 실패했습니다',
    'result.toast.image': '이미지 생성 중...',
    'result.toast.imageDone': '이미지가 저장되었습니다!',
    'result.toast.imageFail': '이미지 생성에 실패했습니다',
    'result.toast.emailSent': '리포트가 이메일로 전송되었습니다!',
    'result.toast.emailFail': '리포트 이메일 전송에 실패했습니다',
    'result.toast.linkCopied': '링크가 클립보드에 복사되었습니다!',
    'result.toast.linkFail': '링크 복사에 실패했습니다',

    // Result Page - Hero
    'result.hero.badge': '상위 3% 희소 아이덴티티',
    'result.hero.vibePrefix': '당신의 바이브:',
    'result.hero.base': '프라이머리 베이스',
    'result.hero.energy': '에너지',
    'result.hero.season': '시즌',

    // Result Page - Analysis Grid
    'result.sections.bodyType': '체형',
    'result.sections.colorSeason': '퍼스널 컬러 시즌',
    'result.sections.bestSilhouette': '베스트 실루엣',
    'result.sections.signatureLip': '시그니처 립',
    'result.analyzing': '분석 중...',
    'result.processing': '처리 중...',

    // Result Page - Lookbook
    'result.lookbook.title': '아이덴티티 룩북',
    'result.lookbook.subtitle': 'AI 생성 큐레이션 컨셉',
    'result.lookbook.concept': '컨셉',
    'result.lookbook.vibeStory': '바이브 스토리',

    // Result Page - Hair
    'result.hair.badge': '프리미엄 분석',
    'result.hair.title1': '당신의',
    'result.hair.title2': '퍼펙트 컷 시각화',
    'result.hair.faceShape': '얼굴형 감지',
    'result.hair.advice': '마스터 스타일리스트 조언',
    'result.hair.loading': '맞춤형 헤어 분석을 준비 중입니다...',

    // Result Page - Shopping
    'result.shopping.title': '지금 꼭 필요한 아이템',
    'result.shopping.subtitle': '부티크 큐레이션 에센셜',

    // Result Page - Color Story
    'result.colorStory.title': '컬러 스토리',

    // Result Page - CTA
    'result.cta.title1': '당신의 아이덴티티를',
    'result.cta.title2': '소유할 준비가 되셨나요?',
    'result.cta.styleData': '스타일 데이터 2024',

    // Result Page - Header nav
    'result.nav.identity': '아이덴티티',
    'result.nav.lookbook': '룩북',
    'result.nav.hair': '헤어',
    'result.nav.shopping': '쇼핑',
    'result.nav.colors': '컬러',

    // Header - Landing nav
    'header.nav.reviews': '리뷰',
    'header.nav.howItWorks': '이용 방법',
    'header.nav.getStarted': '시작하기',

    // Header - Result nav
    'header.nav.analysis': '분석',
    'header.nav.wardrobe': '가상 옷장',
    'header.nav.collections': '컬렉션',
    'header.nav.settings': '설정',
    'header.downloadReport': '리포트 다운로드',

    // Footer
    'footer.privacy': '개인정보 처리방침',
    'footer.terms': '이용약관',
    'footer.refund': '환불 정책',
    'footer.copyright': '2026 StyleLens. All rights reserved.',

    // Legal pages
    'legal.backToHome': '홈으로 돌아가기',
    'legal.englishOnly': '이 페이지는 영어로만 제공됩니다.',

    // Share
    'share.title': '나의 StyleLens 리포트',
    'share.text': '나의 맞춤형 스타일 분석을 확인해보세요!',
};
