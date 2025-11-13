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

