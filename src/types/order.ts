export type PurchaseType = '온라인' | '온라인 CMS' | '오프라인' | '오프라인 CMS' | '-'
export type MallStatus = '결제 완료' | '취소'
export type OrderStatus = '진행중' | '취소' | '완료'
export type DocumentStatus = '서류제출-발송' | '서류제출-진행중' | '서류제출-제출완료' | '만료'
export type Partner = '배달의 민족' | '쿠팡이츠' | '요기요' | '떙겨요'
export type OrderSource = '자사몰' | '스마트스토어'

export interface Order {
  id: string
  orderNumber: string
  purchaseType: PurchaseType
  tag: string
  mallStatus: MallStatus
  orderStatus: OrderStatus
  documentStatus: DocumentStatus
  allSignDispatch: boolean
  businessNumber: string
  partner: Partner
  orderTime: string
  orderSource: OrderSource
  buyerName: string
  phoneNumber: string
  paymentAmount: number
  itemCount: number
  productOrderNumber: string
  productCode: string
  productName: string
  productQuantity: number
  productOptions: string
  companyName: string
  address: string
}

export interface OrderItem {
  id: string
  orderId: string
  productName: string
}

export interface History {
  id: string
  orderId: string
  content: string
  mentionedTeams: string[]
  createdAt: string
  createdBy: string
  images?: string[]
}

export type Team = '서류검수' | '운영관리' | 'md' | 'scm' | 'cx'

// 구매 상담 관련 타입
export type LeadStatus = '리드 인입' | '상담 시도' | '상담중' | '구매' | '실패'
export type BusinessType = '음식점' | '카페' | '편의점' | '마트' | '기타'
export type Media = '네이버' | '구글' | '인스타그램' | '페이스북' | '기타'
export type SpecialNote = '-' | '재통화 요청' | '팔로업 필요'
export type FailureReason = '부적격-컨택전' | '부적격-컨택후' | '기타'

export interface Lead {
  id: string
  storeName: string // 가맹점 이름
  phoneNumber: string // 전화번호
  businessType: BusinessType // 업종
  media: Media // 매체
  absentCount: number // n차 부재
  status: LeadStatus // 상태
  createdAt: string // 리드 인입 일시
  lastConsultationAt?: string // 마지막 상담 일시
  assignedTo: string // 담당자
  isDuplicate: boolean // 중복 여부
  isPurchased: boolean // 구매 여부
  specialNote: SpecialNote // 특이사항
  failureReason?: FailureReason // 실패 사유 (실패 상태일 때만)
}

