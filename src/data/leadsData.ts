import { Lead, BusinessType, Media, LeadType } from '../types/order'

// 가맹점 이름 목록
const storeNames = [
  '맛있는 식당',
  '커피하우스',
  '편의마트',
  '슈퍼마켓',
  '분식집'
]

// 업종 목록
const businessTypes: BusinessType[] = ['음식점', '카페', '편의점', '마트', '기타']

// 매체 목록
const mediaList: Media[] = ['네이버', '구글', '인스타그램', '페이스북', '기타']

// 담당자 목록
const assignedToNames = [
  '이태림',
  '민균채',
  '진예원',
  '손혜정',
  '수민김'
]

// 전화번호 생성
function generatePhoneNumber(): string {
  const middle = Math.floor(Math.random() * 9000) + 1000
  const last = Math.floor(Math.random() * 9000) + 1000
  return `010-${middle}-${last}`
}

// 생성일시 생성
function generateCreatedAt(index: number): string {
  const date = new Date()
  date.setDate(date.getDate() - index)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hour = String(Math.floor(Math.random() * 24)).padStart(2, '0')
  const minute = String(Math.floor(Math.random() * 60)).padStart(2, '0')
  return `${year}-${month}-${day} ${hour}:${minute}`
}

// 마지막 상담일시 생성 (리드 인입 이후 시간)
function generateLastConsultationAt(createdAt: string): string {
  const baseDate = new Date(createdAt)
  // 리드 인입 이후 1~3일 후
  baseDate.setDate(baseDate.getDate() + Math.floor(Math.random() * 3) + 1)
  const year = baseDate.getFullYear()
  const month = String(baseDate.getMonth() + 1).padStart(2, '0')
  const day = String(baseDate.getDate()).padStart(2, '0')
  const hour = String(Math.floor(Math.random() * 24)).padStart(2, '0')
  const minute = String(Math.floor(Math.random() * 60)).padStart(2, '0')
  return `${year}-${month}-${day} ${hour}:${minute}`
}

// 테스트 데이터 생성
const lead1CreatedAt = generateCreatedAt(0)
const lead2CreatedAt = generateCreatedAt(1)
const lead3CreatedAt = generateCreatedAt(2)
const lead4CreatedAt = generateCreatedAt(3)
const lead5CreatedAt = generateCreatedAt(4)

export const mockLeads: Lead[] = [
  {
    id: '1',
    storeName: storeNames[0],
    phoneNumber: generatePhoneNumber(),
    businessType: businessTypes[0],
    media: mediaList[0],
    leadType: '온라인',
    absentCount: 0,
    status: '리드 인입',
    createdAt: lead1CreatedAt,
    lastConsultationAt: undefined,
    assignedTo: assignedToNames[0],
    isDuplicate: false,
    isPurchased: false,
    specialNote: '-',
    failureReason: undefined
  },
  {
    id: '2',
    storeName: storeNames[1],
    phoneNumber: generatePhoneNumber(),
    businessType: businessTypes[1],
    media: mediaList[1],
    leadType: '온라인',
    absentCount: 1,
    status: '상담 시도',
    createdAt: lead2CreatedAt,
    lastConsultationAt: generateLastConsultationAt(lead2CreatedAt),
    assignedTo: assignedToNames[1],
    isDuplicate: true,
    isPurchased: false,
    specialNote: '재통화 요청',
    failureReason: undefined
  },
  {
    id: '3',
    storeName: storeNames[2],
    phoneNumber: generatePhoneNumber(),
    businessType: businessTypes[2],
    media: mediaList[2],
    leadType: '온라인',
    absentCount: 0,
    status: '상담중',
    createdAt: lead3CreatedAt,
    lastConsultationAt: generateLastConsultationAt(lead3CreatedAt),
    assignedTo: assignedToNames[2],
    isDuplicate: false,
    isPurchased: false,
    specialNote: '팔로업 필요',
    failureReason: undefined
  },
  {
    id: '4',
    storeName: storeNames[3],
    phoneNumber: generatePhoneNumber(),
    businessType: businessTypes[3],
    media: mediaList[3],
    leadType: '온라인',
    absentCount: 2,
    status: '구매',
    createdAt: lead4CreatedAt,
    lastConsultationAt: generateLastConsultationAt(lead4CreatedAt),
    assignedTo: assignedToNames[3],
    isDuplicate: false,
    isPurchased: true,
    specialNote: '-',
    failureReason: undefined
  },
  {
    id: '5',
    storeName: storeNames[4],
    phoneNumber: generatePhoneNumber(),
    businessType: businessTypes[4],
    media: mediaList[4],
    leadType: '온라인',
    absentCount: 3,
    status: '실패',
    createdAt: lead5CreatedAt,
    lastConsultationAt: generateLastConsultationAt(lead5CreatedAt),
    assignedTo: assignedToNames[4],
    isDuplicate: true,
    isPurchased: false,
    specialNote: '-',
    failureReason: '부적격-컨택후'
  },
  // 오프라인 리드 추가
  {
    id: '6',
    storeName: '오프라인 카페',
    phoneNumber: generatePhoneNumber(),
    businessType: businessTypes[1],
    media: mediaList[0],
    leadType: '오프라인',
    absentCount: 0,
    status: '리드 인입',
    createdAt: generateCreatedAt(5),
    lastConsultationAt: undefined,
    assignedTo: assignedToNames[0],
    isDuplicate: false,
    isPurchased: false,
    specialNote: '-',
    failureReason: undefined
  },
  {
    id: '7',
    storeName: '오프라인 식당',
    phoneNumber: generatePhoneNumber(),
    businessType: businessTypes[0],
    media: mediaList[2],
    leadType: '오프라인',
    absentCount: 1,
    status: '상담 시도',
    createdAt: generateCreatedAt(6),
    lastConsultationAt: generateLastConsultationAt(generateCreatedAt(6)),
    assignedTo: assignedToNames[1],
    isDuplicate: false,
    isPurchased: false,
    specialNote: '재통화 요청',
    failureReason: undefined
  }
]

