import { DocumentReview, ReviewStatus, CardMerchantType, BusinessOwnerType } from '../types/order'

// 장비 이름 목록
const equipmentNames = [
  '토스 프론트',
  '토스 포스',
  '카드 단말기',
  '스마트 POS',
  '무인 키오스크',
  '태블릿 POS',
  '프린터',
  '스캐너',
  '바코드 리더기',
  '현금 등록기'
]

// 서류 검수자 목록
const reviewers = [
  '김검수',
  '이검수',
  '박검수',
  '정검수',
  '최검수',
  '강검수',
  '윤검수',
  '장검수'
]

// 상호명 목록
const companyNames = [
  '맛있는 식당',
  '커피하우스',
  '편의마트',
  '슈퍼마켓',
  '분식집',
  '치킨집',
  '피자집',
  '햄버거집',
  '일식당',
  '중식당',
  '한식당',
  '양식당',
  '카페베네',
  '스타벅스',
  '투썸플레이스',
  '이디야커피',
  'GS25',
  'CU',
  '세븐일레븐',
  '이마트24'
]

// 검수 상태 목록
const reviewStatuses: ReviewStatus[] = ['대기', '진행중', '보완 요청', '보완 확인필요', '완료', '취소', '이슈']

// 카드사 가맹유형 목록
const cardMerchantTypes: CardMerchantType[] = ['신규', '기가맹']

// 사업자 유형 목록
const businessOwnerTypes: BusinessOwnerType[] = [
  '개인-단독대표',
  '개인-공동대표',
  '법인-단독대표',
  '법인-공동대표'
]

// 주문번호 생성
function generateOrderNumber(index: number): string {
  const number = String(index + 1).padStart(6, '0')
  return `20251113-${number}`
}

// 날짜/시간 생성 (2025-11-13 9:21 AM 형식)
function generateDateTime(daysAgo: number, hour: number, minute: number, ampm: 'AM' | 'PM'): string {
  const date = new Date()
  date.setDate(date.getDate() - daysAgo)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hourStr = String(hour).padStart(2, '0')
  const minuteStr = String(minute).padStart(2, '0')
  return `${year}-${month}-${day} ${hourStr}:${minuteStr} ${ampm}`
}

// 사업자번호 생성
function generateBusinessNumber(): string {
  const first = Math.floor(Math.random() * 900) + 100
  const second = Math.floor(Math.random() * 90) + 10
  const third = Math.floor(Math.random() * 100000) + 10000
  return `${first}-${second}-${third}`
}

// 테스트 데이터 생성
export const mockDocumentReviews: DocumentReview[] = Array.from({ length: 20 }, (_, index) => {
  const reviewStatus = reviewStatuses[index % reviewStatuses.length]
  const equipmentName = equipmentNames[index % equipmentNames.length]
  const orderNumber = generateOrderNumber(index)
  const registeredDaysAgo = index % 30
  const lastModifiedDaysAgo = Math.max(0, registeredDaysAgo - Math.floor(Math.random() * 5))
  
  return {
    id: `review-${index + 1}`,
    reviewStatus,
    subscriptionTaskCount: Math.floor(Math.random() * 2), // 0 또는 1
    iPartnersCreated: Math.random() > 0.3, // 70% 확률로 true
    registeredAt: generateDateTime(registeredDaysAgo, Math.floor(Math.random() * 12) + 1, Math.floor(Math.random() * 60), Math.random() > 0.5 ? 'AM' : 'PM'),
    lastModifiedAt: generateDateTime(lastModifiedDaysAgo, Math.floor(Math.random() * 12) + 1, Math.floor(Math.random() * 60), Math.random() > 0.5 ? 'AM' : 'PM'),
    orderNumber,
    companyName: companyNames[index % companyNames.length],
    businessNumber: generateBusinessNumber(),
    allSignDocumentTitle: `${equipmentName}_${orderNumber}`,
    reviewer: reviewStatus === '대기' ? '' : reviewers[index % reviewers.length],
    preShipping: Math.random() > 0.6, // 40% 확률로 true
    reviewCompletedAt: reviewStatus === '완료' ? generateDateTime(Math.max(0, registeredDaysAgo - 2), Math.floor(Math.random() * 12) + 1, Math.floor(Math.random() * 60), Math.random() > 0.5 ? 'AM' : 'PM') : undefined,
    cardMerchantType: cardMerchantTypes[index % cardMerchantTypes.length],
    businessOwnerType: businessOwnerTypes[index % businessOwnerTypes.length]
  }
})

