import { Order, History, PurchaseType, OrderSource } from '../types/order'

// 구매 유형에 따라 tag 생성
function getTagByPurchaseType(purchaseType: PurchaseType): string {
  switch (purchaseType) {
    case '온라인':
      return '서류제출필요-온라인-판매'
    case '온라인 CMS':
      return '서류제출필요-온라인-임대'
    case '오프라인':
      return '서류제출필요-오프라인-판매'
    case '오프라인 CMS':
      return '서류제출필요-오프라인-임대'
    case '-':
      return '-'
    default:
      return '-'
  }
}

// 주문번호 생성 헬퍼 함수
function generateOrderNumber(index: number): string {
  const number = String(index).padStart(6, '0')
  return `20251113-${number}`
}

// 주문 시각 생성 (2025-11-13 9:00:05 형태)
function generateOrderTime(_index: number): string {
  const hour = Math.floor(Math.random() * 12) + 8 // 8시~19시
  const minute = Math.floor(Math.random() * 60)
  const second = Math.floor(Math.random() * 60)
  // 시간은 한 자리일 수도 있음 (9시, 10시 등)
  const minuteStr = String(minute).padStart(2, '0')
  const secondStr = String(second).padStart(2, '0')
  return `2025-11-13 ${hour}:${minuteStr}:${secondStr}`
}

// 주문 출처 무작위 선택
function getRandomOrderSource(): OrderSource {
  return Math.random() > 0.5 ? '자사몰' : '스마트스토어'
}

// 구매자명 생성
const buyerNames = [
  '김철수', '이영희', '박민수', '정수진', '최동현',
  '강미영', '윤성호', '장지은', '임태현', '한소영',
  '오승호', '신유나', '문혜진', '류현우', '조은지',
  '송민준', '권수빈', '황지훈', '고은영', '남대현'
]

function getBuyerName(index: number): string {
  return buyerNames[index % buyerNames.length]
}

// 전화번호 생성
function generatePhoneNumber(): string {
  const middle = Math.floor(Math.random() * 9000) + 1000
  const last = Math.floor(Math.random() * 9000) + 1000
  return `010-${middle}-${last}`
}

// 결제 금액 생성 (만원대 단위)
function generatePaymentAmount(): number {
  const amounts = [10000, 20000, 30000, 50000, 70000, 100000, 150000, 200000, 300000, 500000]
  return amounts[Math.floor(Math.random() * amounts.length)]
}

// 품목주문 개수 생성 (1~5개)
function generateItemCount(): number {
  return Math.floor(Math.random() * 5) + 1
}

// 상품주문번호 생성
function generateProductOrderNumber(orderNumber: string, index: number): string {
  return `${orderNumber}-${String(index).padStart(2, '0')}`
}

// 상품코드 생성
function generateProductCode(index: number): string {
  return `P${String(index).padStart(6, '0')}EG`
}

// 상품명 생성
const productNames = [
  '[인사이드 세일즈_구매용_OPEN EVENT] 토스 프론트 36개월 0원',
  '[인사이드 세일즈_구매용_OPEN EVENT] 토스 프론트 24개월 0원',
  '[인사이드 세일즈_구매용_OPEN EVENT] 토스 프론트 12개월 0원',
  '[인사이드 세일즈_임대용_OPEN EVENT] 토스 프론트 36개월',
  '[인사이드 세일즈_임대용_OPEN EVENT] 토스 프론트 24개월'
]

function getProductName(index: number): string {
  return productNames[index % productNames.length]
}

// 상품옵션 생성
const productOptionsTemplates = [
  '카드사 가맹 여부=개인사업자 (기존 가맹), 프론트 색상=토스 프론트 화이트, 포스 기기 신청=미선택(보유중인 기기 사용), 단말기 구성=0.프론트+토스포스(무료), 금전함 신청(구성 5번부터 선택가능)=미선택',
  '카드사 가맹 여부=법인사업자 (기존 가맹), 프론트 색상=토스 프론트 블랙, 포스 기기 신청=신규 신청, 단말기 구성=1.프론트+토스포스+금전함, 금전함 신청(구성 5번부터 선택가능)=선택',
  '카드사 가맹 여부=개인사업자 (신규 가맹), 프론트 색상=토스 프론트 화이트, 포스 기기 신청=미선택(보유중인 기기 사용), 단말기 구성=0.프론트+토스포스(무료), 금전함 신청(구성 5번부터 선택가능)=미선택'
]

function getProductOptions(index: number): string {
  return productOptionsTemplates[index % productOptionsTemplates.length]
}

// 상호명 생성
const companyNames = [
  '홍길동 상회',
  '김철수 사업체',
  '이영희 카페',
  '박민수 식당',
  '정수진 마트',
  '최동현 편의점',
  '강미영 카페',
  '윤성호 식당',
  '장지은 상회',
  '임태현 마트',
  '한소영 편의점',
  '오승호 카페',
  '신유나 식당',
  '문혜진 상회',
  '류현우 마트',
  '조은지 편의점',
  '송민준 카페',
  '권수빈 식당',
  '황지훈 상회',
  '고은영 마트'
]

function getCompanyName(index: number): string {
  return companyNames[index % companyNames.length]
}

// 주소 생성
const addresses = [
  '서울특별시 강남구 테헤란로 123',
  '서울특별시 서초구 서초대로 456',
  '서울특별시 송파구 올림픽로 789',
  '서울특별시 마포구 홍대로 321',
  '서울특별시 용산구 한강대로 654',
  '경기도 성남시 분당구 판교로 987',
  '경기도 수원시 영통구 광교로 147',
  '경기도 고양시 일산동구 정발산로 258',
  '인천광역시 남동구 인주대로 369',
  '부산광역시 해운대구 해운대해변로 741',
  '대구광역시 수성구 범어천로 852',
  '광주광역시 서구 상무중앙로 963',
  '대전광역시 유성구 대학로 159',
  '울산광역시 남구 삼산로 357',
  '세종특별자치시 세종시 조치원읍 세종로 468',
  '강원도 춘천시 중앙로 579',
  '충청북도 청주시 상당구 상당로 680',
  '충청남도 천안시 동남구 병천면 천안대로 791',
  '전라북도 전주시 덕진구 동부대로 802',
  '전라남도 목포시 양을로 913'
]

function getAddress(index: number): string {
  return addresses[index % addresses.length]
}

// 품목 상품명 목록
const itemProductNames = [
  '영수증 용지',
  '영수증프린터',
  '프론트-프린터 연결젠더'
]

function getRandomItemProductName(): string {
  return itemProductNames[Math.floor(Math.random() * itemProductNames.length)]
}

// 사업자번호 목록 (20개)
const businessNumbers = [
  '123-45-67890',
  '234-56-78901',
  '345-67-89012',
  '456-78-90123',
  '567-89-01234',
  '678-90-12345',
  '789-01-23456',
  '890-12-34567',
  '901-23-45678',
  '012-34-56789',
  '111-22-33344',
  '222-33-44455',
  '333-44-55566',
  '444-55-66677',
  '555-66-77788',
  '666-77-88899',
  '777-88-99900',
  '888-99-00011',
  '999-00-11122',
  '000-11-22233'
]

// 전화번호 목록 (고정 값으로 생성)
const phoneNumbers = Array.from({ length: 20 }, () => generatePhoneNumber())

export const mockOrders: Order[] = [
  {
    id: '1',
    orderNumber: generateOrderNumber(1),
    purchaseType: '온라인',
    tag: getTagByPurchaseType('온라인'),
    mallStatus: '결제 완료',
    orderStatus: '진행중',
    documentStatus: '서류제출-진행중',
    allSignDispatch: false,
    businessNumber: businessNumbers[0],
    partner: '배달의 민족',
    orderTime: generateOrderTime(1),
    orderSource: getRandomOrderSource(),
    buyerName: getBuyerName(0),
    phoneNumber: phoneNumbers[0],
    paymentAmount: generatePaymentAmount(),
    itemCount: generateItemCount(),
    productOrderNumber: generateProductOrderNumber(generateOrderNumber(1), 1),
    productCode: generateProductCode(1),
    productName: getProductName(0),
    productQuantity: 1,
    productOptions: getProductOptions(0),
    companyName: getCompanyName(0),
    address: getAddress(0)
  },
  {
    id: '2',
    orderNumber: generateOrderNumber(2),
    purchaseType: '온라인 CMS',
    tag: getTagByPurchaseType('온라인 CMS'),
    mallStatus: '결제 완료',
    orderStatus: '완료',
    documentStatus: '서류제출-제출완료',
    allSignDispatch: true,
    businessNumber: businessNumbers[1],
    partner: '쿠팡이츠',
    orderTime: generateOrderTime(2),
    orderSource: getRandomOrderSource(),
    buyerName: getBuyerName(1),
    phoneNumber: phoneNumbers[1],
    paymentAmount: generatePaymentAmount(),
    itemCount: generateItemCount(),
    productOrderNumber: generateProductOrderNumber(generateOrderNumber(2), 1),
    productCode: generateProductCode(2),
    productName: getProductName(1),
    productQuantity: 1,
    productOptions: getProductOptions(1),
    companyName: getCompanyName(1),
    address: getAddress(1)
  },
  {
    id: '3',
    orderNumber: generateOrderNumber(3),
    purchaseType: '오프라인',
    tag: getTagByPurchaseType('오프라인'),
    mallStatus: '결제 완료',
    orderStatus: '진행중',
    documentStatus: '서류제출-발송',
    allSignDispatch: true,
    businessNumber: businessNumbers[2],
    partner: '요기요',
    orderTime: generateOrderTime(3),
    orderSource: getRandomOrderSource(),
    buyerName: getBuyerName(2),
    phoneNumber: phoneNumbers[2],
    paymentAmount: generatePaymentAmount(),
    itemCount: generateItemCount(),
    productOrderNumber: generateProductOrderNumber(generateOrderNumber(3), 1),
    productCode: generateProductCode(3),
    productName: getProductName(2),
    productQuantity: 1,
    productOptions: getProductOptions(2),
    companyName: getCompanyName(2),
    address: getAddress(2)
  },
  {
    id: '4',
    orderNumber: generateOrderNumber(4),
    purchaseType: '오프라인 CMS',
    tag: getTagByPurchaseType('오프라인 CMS'),
    mallStatus: '취소',
    orderStatus: '취소',
    documentStatus: '만료',
    allSignDispatch: false,
    businessNumber: businessNumbers[3],
    partner: '떙겨요',
    orderTime: generateOrderTime(4),
    orderSource: getRandomOrderSource(),
    buyerName: getBuyerName(3),
    phoneNumber: phoneNumbers[3],
    paymentAmount: generatePaymentAmount(),
    itemCount: generateItemCount(),
    productOrderNumber: generateProductOrderNumber(generateOrderNumber(4), 1),
    productCode: generateProductCode(4),
    productName: getProductName(3),
    productQuantity: 1,
    productOptions: getProductOptions(0),
    companyName: getCompanyName(3),
    address: getAddress(3)
  },
  {
    id: '5',
    orderNumber: generateOrderNumber(5),
    purchaseType: '-',
    tag: getTagByPurchaseType('-'),
    mallStatus: '결제 완료',
    orderStatus: '진행중',
    documentStatus: '서류제출-진행중',
    allSignDispatch: false,
    businessNumber: businessNumbers[4],
    partner: '배달의 민족',
    orderTime: generateOrderTime(5),
    orderSource: getRandomOrderSource(),
    buyerName: getBuyerName(4),
    phoneNumber: phoneNumbers[4],
    paymentAmount: generatePaymentAmount(),
    itemCount: generateItemCount(),
    productOrderNumber: generateProductOrderNumber(generateOrderNumber(5), 1),
    productCode: generateProductCode(5),
    productName: getProductName(4),
    productQuantity: 1,
    productOptions: getProductOptions(1),
    companyName: getCompanyName(4),
    address: getAddress(4)
  },
  {
    id: '6',
    orderNumber: generateOrderNumber(6),
    purchaseType: '온라인',
    tag: getTagByPurchaseType('온라인'),
    mallStatus: '결제 완료',
    orderStatus: '완료',
    documentStatus: '서류제출-제출완료',
    allSignDispatch: true,
    businessNumber: businessNumbers[5],
    partner: '쿠팡이츠',
    orderTime: generateOrderTime(6),
    orderSource: getRandomOrderSource(),
    buyerName: getBuyerName(5),
    phoneNumber: phoneNumbers[5],
    paymentAmount: generatePaymentAmount(),
    itemCount: generateItemCount(),
    productOrderNumber: generateProductOrderNumber(generateOrderNumber(6), 1),
    productCode: generateProductCode(6),
    productName: getProductName(0),
    productQuantity: 1,
    productOptions: getProductOptions(2),
    companyName: getCompanyName(5),
    address: getAddress(5)
  },
  {
    id: '7',
    orderNumber: generateOrderNumber(7),
    purchaseType: '온라인 CMS',
    tag: getTagByPurchaseType('온라인 CMS'),
    mallStatus: '결제 완료',
    orderStatus: '진행중',
    documentStatus: '서류제출-발송',
    allSignDispatch: true,
    businessNumber: businessNumbers[6],
    partner: '요기요',
    orderTime: generateOrderTime(7),
    orderSource: getRandomOrderSource(),
    buyerName: getBuyerName(6),
    phoneNumber: phoneNumbers[6],
    paymentAmount: generatePaymentAmount(),
    itemCount: generateItemCount(),
    productOrderNumber: generateProductOrderNumber(generateOrderNumber(7), 1),
    productCode: generateProductCode(7),
    productName: getProductName(1),
    productQuantity: 1,
    productOptions: getProductOptions(0),
    companyName: getCompanyName(6),
    address: getAddress(6)
  },
  {
    id: '8',
    orderNumber: generateOrderNumber(8),
    purchaseType: '오프라인',
    tag: getTagByPurchaseType('오프라인'),
    mallStatus: '결제 완료',
    orderStatus: '완료',
    documentStatus: '서류제출-제출완료',
    allSignDispatch: false,
    businessNumber: businessNumbers[7],
    partner: '떙겨요',
    orderTime: generateOrderTime(8),
    orderSource: getRandomOrderSource(),
    buyerName: getBuyerName(7),
    phoneNumber: phoneNumbers[7],
    paymentAmount: generatePaymentAmount(),
    itemCount: generateItemCount(),
    productOrderNumber: generateProductOrderNumber(generateOrderNumber(8), 1),
    productCode: generateProductCode(8),
    productName: getProductName(2),
    productQuantity: 1,
    productOptions: getProductOptions(1),
    companyName: getCompanyName(7),
    address: getAddress(7)
  },
  {
    id: '9',
    orderNumber: generateOrderNumber(9),
    purchaseType: '오프라인 CMS',
    tag: getTagByPurchaseType('오프라인 CMS'),
    mallStatus: '결제 완료',
    orderStatus: '진행중',
    documentStatus: '서류제출-진행중',
    allSignDispatch: true,
    businessNumber: businessNumbers[8],
    partner: '배달의 민족',
    orderTime: generateOrderTime(9),
    orderSource: getRandomOrderSource(),
    buyerName: getBuyerName(8),
    phoneNumber: phoneNumbers[8],
    paymentAmount: generatePaymentAmount(),
    itemCount: generateItemCount(),
    productOrderNumber: generateProductOrderNumber(generateOrderNumber(9), 1),
    productCode: generateProductCode(9),
    productName: getProductName(3),
    productQuantity: 1,
    productOptions: getProductOptions(2),
    companyName: getCompanyName(8),
    address: getAddress(8)
  },
  {
    id: '10',
    orderNumber: generateOrderNumber(10),
    purchaseType: '온라인',
    tag: getTagByPurchaseType('온라인'),
    mallStatus: '취소',
    orderStatus: '취소',
    documentStatus: '만료',
    allSignDispatch: false,
    businessNumber: businessNumbers[9],
    partner: '쿠팡이츠',
    orderTime: generateOrderTime(10),
    orderSource: getRandomOrderSource(),
    buyerName: getBuyerName(9),
    phoneNumber: phoneNumbers[9],
    paymentAmount: generatePaymentAmount(),
    itemCount: generateItemCount(),
    productOrderNumber: generateProductOrderNumber(generateOrderNumber(10), 1),
    productCode: generateProductCode(10),
    productName: getProductName(4),
    productQuantity: 1,
    productOptions: getProductOptions(0),
    companyName: getCompanyName(9),
    address: getAddress(9)
  },
  {
    id: '11',
    orderNumber: generateOrderNumber(11),
    purchaseType: '온라인 CMS',
    tag: getTagByPurchaseType('온라인 CMS'),
    mallStatus: '결제 완료',
    orderStatus: '완료',
    documentStatus: '서류제출-발송',
    allSignDispatch: true,
    businessNumber: businessNumbers[10],
    partner: '요기요',
    orderTime: generateOrderTime(11),
    orderSource: getRandomOrderSource(),
    buyerName: getBuyerName(10),
    phoneNumber: phoneNumbers[10],
    paymentAmount: generatePaymentAmount(),
    itemCount: generateItemCount(),
    productOrderNumber: generateProductOrderNumber(generateOrderNumber(11), 1),
    productCode: generateProductCode(11),
    productName: getProductName(0),
    productQuantity: 1,
    productOptions: getProductOptions(1),
    companyName: getCompanyName(10),
    address: getAddress(10)
  },
  {
    id: '12',
    orderNumber: generateOrderNumber(12),
    purchaseType: '오프라인',
    tag: getTagByPurchaseType('오프라인'),
    mallStatus: '결제 완료',
    orderStatus: '진행중',
    documentStatus: '서류제출-제출완료',
    allSignDispatch: false,
    businessNumber: businessNumbers[11],
    partner: '떙겨요',
    orderTime: generateOrderTime(12),
    orderSource: getRandomOrderSource(),
    buyerName: getBuyerName(11),
    phoneNumber: phoneNumbers[11],
    paymentAmount: generatePaymentAmount(),
    itemCount: generateItemCount(),
    productOrderNumber: generateProductOrderNumber(generateOrderNumber(12), 1),
    productCode: generateProductCode(12),
    productName: getProductName(1),
    productQuantity: 1,
    productOptions: getProductOptions(2),
    companyName: getCompanyName(11),
    address: getAddress(11)
  },
  {
    id: '13',
    orderNumber: generateOrderNumber(13),
    purchaseType: '오프라인 CMS',
    tag: getTagByPurchaseType('오프라인 CMS'),
    mallStatus: '결제 완료',
    orderStatus: '완료',
    documentStatus: '서류제출-진행중',
    allSignDispatch: true,
    businessNumber: businessNumbers[12],
    partner: '배달의 민족',
    orderTime: generateOrderTime(13),
    orderSource: getRandomOrderSource(),
    buyerName: getBuyerName(12),
    phoneNumber: phoneNumbers[12],
    paymentAmount: generatePaymentAmount(),
    itemCount: generateItemCount(),
    productOrderNumber: generateProductOrderNumber(generateOrderNumber(13), 1),
    productCode: generateProductCode(13),
    productName: getProductName(2),
    productQuantity: 1,
    productOptions: getProductOptions(0),
    companyName: getCompanyName(12),
    address: getAddress(12)
  },
  {
    id: '14',
    orderNumber: generateOrderNumber(14),
    purchaseType: '-',
    tag: getTagByPurchaseType('-'),
    mallStatus: '결제 완료',
    orderStatus: '진행중',
    documentStatus: '서류제출-발송',
    allSignDispatch: false,
    businessNumber: businessNumbers[13],
    partner: '쿠팡이츠',
    orderTime: generateOrderTime(14),
    orderSource: getRandomOrderSource(),
    buyerName: getBuyerName(13),
    phoneNumber: phoneNumbers[13],
    paymentAmount: generatePaymentAmount(),
    itemCount: generateItemCount(),
    productOrderNumber: generateProductOrderNumber(generateOrderNumber(14), 1),
    productCode: generateProductCode(14),
    productName: getProductName(3),
    productQuantity: 1,
    productOptions: getProductOptions(1),
    companyName: getCompanyName(13),
    address: getAddress(13)
  },
  {
    id: '15',
    orderNumber: generateOrderNumber(15),
    purchaseType: '온라인',
    tag: getTagByPurchaseType('온라인'),
    mallStatus: '결제 완료',
    orderStatus: '완료',
    documentStatus: '서류제출-제출완료',
    allSignDispatch: true,
    businessNumber: businessNumbers[14],
    partner: '요기요',
    orderTime: generateOrderTime(15),
    orderSource: getRandomOrderSource(),
    buyerName: getBuyerName(14),
    phoneNumber: phoneNumbers[14],
    paymentAmount: generatePaymentAmount(),
    itemCount: generateItemCount(),
    productOrderNumber: generateProductOrderNumber(generateOrderNumber(15), 1),
    productCode: generateProductCode(15),
    productName: getProductName(4),
    productQuantity: 1,
    productOptions: getProductOptions(2),
    companyName: getCompanyName(14),
    address: getAddress(14)
  },
  {
    id: '16',
    orderNumber: generateOrderNumber(16),
    purchaseType: '온라인 CMS',
    tag: getTagByPurchaseType('온라인 CMS'),
    mallStatus: '취소',
    orderStatus: '취소',
    documentStatus: '만료',
    allSignDispatch: false,
    businessNumber: businessNumbers[15],
    partner: '떙겨요',
    orderTime: generateOrderTime(16),
    orderSource: getRandomOrderSource(),
    buyerName: getBuyerName(15),
    phoneNumber: phoneNumbers[15],
    paymentAmount: generatePaymentAmount(),
    itemCount: generateItemCount(),
    productOrderNumber: generateProductOrderNumber(generateOrderNumber(16), 1),
    productCode: generateProductCode(16),
    productName: getProductName(0),
    productQuantity: 1,
    productOptions: getProductOptions(0),
    companyName: getCompanyName(15),
    address: getAddress(15)
  },
  {
    id: '17',
    orderNumber: generateOrderNumber(17),
    purchaseType: '오프라인',
    tag: getTagByPurchaseType('오프라인'),
    mallStatus: '결제 완료',
    orderStatus: '진행중',
    documentStatus: '서류제출-진행중',
    allSignDispatch: true,
    businessNumber: businessNumbers[16],
    partner: '배달의 민족',
    orderTime: generateOrderTime(17),
    orderSource: getRandomOrderSource(),
    buyerName: getBuyerName(16),
    phoneNumber: phoneNumbers[16],
    paymentAmount: generatePaymentAmount(),
    itemCount: generateItemCount(),
    productOrderNumber: generateProductOrderNumber(generateOrderNumber(17), 1),
    productCode: generateProductCode(17),
    productName: getProductName(1),
    productQuantity: 1,
    productOptions: getProductOptions(1),
    companyName: getCompanyName(16),
    address: getAddress(16)
  },
  {
    id: '18',
    orderNumber: generateOrderNumber(18),
    purchaseType: '오프라인 CMS',
    tag: getTagByPurchaseType('오프라인 CMS'),
    mallStatus: '결제 완료',
    orderStatus: '완료',
    documentStatus: '서류제출-발송',
    allSignDispatch: true,
    businessNumber: businessNumbers[17],
    partner: '쿠팡이츠',
    orderTime: generateOrderTime(18),
    orderSource: getRandomOrderSource(),
    buyerName: getBuyerName(17),
    phoneNumber: phoneNumbers[17],
    paymentAmount: generatePaymentAmount(),
    itemCount: generateItemCount(),
    productOrderNumber: generateProductOrderNumber(generateOrderNumber(18), 1),
    productCode: generateProductCode(18),
    productName: getProductName(2),
    productQuantity: 1,
    productOptions: getProductOptions(2),
    companyName: getCompanyName(17),
    address: getAddress(17)
  },
  {
    id: '19',
    orderNumber: generateOrderNumber(19),
    purchaseType: '온라인',
    tag: getTagByPurchaseType('온라인'),
    mallStatus: '결제 완료',
    orderStatus: '진행중',
    documentStatus: '서류제출-제출완료',
    allSignDispatch: false,
    businessNumber: businessNumbers[18],
    partner: '요기요',
    orderTime: generateOrderTime(19),
    orderSource: getRandomOrderSource(),
    buyerName: getBuyerName(18),
    phoneNumber: phoneNumbers[18],
    paymentAmount: generatePaymentAmount(),
    itemCount: generateItemCount(),
    productOrderNumber: generateProductOrderNumber(generateOrderNumber(19), 1),
    productCode: generateProductCode(19),
    productName: getProductName(3),
    productQuantity: 1,
    productOptions: getProductOptions(0),
    companyName: getCompanyName(18),
    address: getAddress(18)
  },
  {
    id: '20',
    orderNumber: generateOrderNumber(20),
    purchaseType: '온라인 CMS',
    tag: getTagByPurchaseType('온라인 CMS'),
    mallStatus: '결제 완료',
    orderStatus: '완료',
    documentStatus: '서류제출-제출완료',
    allSignDispatch: true,
    businessNumber: businessNumbers[19],
    partner: '떙겨요',
    orderTime: generateOrderTime(20),
    orderSource: getRandomOrderSource(),
    buyerName: getBuyerName(19),
    phoneNumber: phoneNumbers[19],
    paymentAmount: generatePaymentAmount(),
    itemCount: generateItemCount(),
    productOrderNumber: generateProductOrderNumber(generateOrderNumber(20), 1),
    productCode: generateProductCode(20),
    productName: getProductName(19 % 5),
    productQuantity: 1,
    productOptions: getProductOptions(19 % 3),
    companyName: getCompanyName(19),
    address: getAddress(19)
  }
]

export const mockHistories: History[] = [
  {
    id: '1',
    orderId: '1',
    content: '주문이 접수되었습니다.',
    mentionedTeams: [],
    createdAt: '2024-11-13 09:00:00',
    createdBy: '시스템'
  },
  {
    id: '2',
    orderId: '1',
    content: '서류 검수가 필요합니다. @서류검수',
    mentionedTeams: ['서류검수'],
    createdAt: '2024-11-13 10:30:00',
    createdBy: '관리자'
  },
  {
    id: '3',
    orderId: '2',
    content: '주문 처리 중입니다.',
    mentionedTeams: [],
    createdAt: '2024-11-13 11:00:00',
    createdBy: '시스템'
  }
]

// 품목주문 목록 생성 함수
export function generateOrderItems(_orderId: string, itemCount: number): string[] {
  const items: string[] = []
  for (let i = 0; i < itemCount; i++) {
    items.push(getRandomItemProductName())
  }
  return items
}
