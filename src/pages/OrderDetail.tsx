import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { mockOrders, generateOrderItems } from '../data/mockData'
import { mockHistories } from '../data/mockData'
import { Order, History, Team } from '../types/order'
import HistoryPanel from '../components/HistoryPanel'

const TEAMS: Team[] = ['서류검수', '운영관리', 'md', 'scm', 'cx']

export default function OrderDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [order, setOrder] = useState<Order | null>(null)
  const [histories, setHistories] = useState<History[]>([])
  const [orderItems, setOrderItems] = useState<string[]>([])

  useEffect(() => {
    const foundOrder = mockOrders.find(o => o.id === id)
    if (foundOrder) {
      setOrder(foundOrder)
      // 품목주문 목록 생성
      const items = generateOrderItems(foundOrder.id, foundOrder.itemCount)
      setOrderItems(items)
      const orderHistories = mockHistories.filter(h => h.orderId === id)
      
      // 주문 상품 정보 히스토리 자동 생성
      const productHistory: History = {
        id: `product-${foundOrder.id}`,
        orderId: foundOrder.id,
        content: `상품주문번호 : ${foundOrder.productOrderNumber}
상품코드 : ${foundOrder.productCode}
상품명 : ${foundOrder.productName}
수량 : ${foundOrder.productQuantity}개
상품옵션 : ${foundOrder.productOptions}`,
        mentionedTeams: [],
        createdAt: foundOrder.orderTime,
        createdBy: '시스템'
      }
      
      // 서류제출-제출완료 상태일 때 추가 히스토리 생성
      const documentHistory: History | null = foundOrder.documentStatus === '서류제출-제출완료' ? {
        id: `document-${foundOrder.id}`,
        orderId: foundOrder.id,
        content: `서류 작성 상태 변경: 서류제출-제출완료
상호명 : ${foundOrder.companyName}
사업자번호 : ${foundOrder.businessNumber}`,
        mentionedTeams: [],
        createdAt: foundOrder.orderTime,
        createdBy: '시스템'
      } : null
      
      // 히스토리 순서: 상품 정보 (가장 오래된) -> 서류 상태 (있는 경우) -> 기존 히스토리 -> 사용자 추가 히스토리
      const allHistories = [productHistory, documentHistory, ...orderHistories].filter(Boolean) as History[]
      // 시간순으로 정렬 (최신이 위로)
      allHistories.sort((a, b) => {
        const dateA = new Date(a.createdAt).getTime()
        const dateB = new Date(b.createdAt).getTime()
        return dateB - dateA
      })
      setHistories(allHistories)
    }
  }, [id])

  if (!order) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <p className="text-gray-500">주문을 찾을 수 없습니다.</p>
          <button
            onClick={() => navigate('/orders')}
            className="mt-4 text-blue-600 hover:text-blue-800"
          >
            목록으로 돌아가기
          </button>
        </div>
      </div>
    )
  }

  const handleAddHistory = (content: string, mentionedTeams: Team[], images?: string[]) => {
    const newHistory: History = {
      id: Date.now().toString(),
      orderId: order.id,
      content,
      mentionedTeams,
      createdAt: new Date().toLocaleString('ko-KR'),
      createdBy: '관리자',
      images: images || []
    }
    setHistories([newHistory, ...histories])
  }

  return (
    <div className="p-2">
      <div className="mb-2">
        <button
          onClick={() => navigate('/orders')}
          className="text-blue-600 hover:text-blue-800 mb-1 text-sm"
        >
          ← 목록으로
        </button>
        <h1 className="text-lg font-bold text-gray-900">주문 상세</h1>
      </div>

      <div className="flex gap-2 h-[calc(100vh-5rem)]">
        {/* 왼쪽: 주문 정보 및 품목주문 목록 (세로 배치) */}
        <div className="flex-1 flex flex-col gap-2 min-h-0">
          {/* 주문 정보 섹션 */}
          <div className="bg-white rounded-lg shadow p-3 overflow-hidden">
            <h2 className="text-sm font-semibold text-gray-900 mb-2">주문 정보</h2>
            <div className="grid grid-cols-2 gap-2">
              {/* 주문 번호 */}
              <div className="border border-gray-200 rounded p-2">
                <div className="text-[10px] font-medium text-gray-500 mb-0.5">주문 번호</div>
                <div className="text-xs text-gray-900">{order.orderNumber}</div>
              </div>
              {/* 주문 시각 */}
              <div className="border border-gray-200 rounded p-2">
                <div className="text-[10px] font-medium text-gray-500 mb-0.5">주문 시각</div>
                <div className="text-xs text-gray-900">{order.orderTime}</div>
              </div>
              {/* 주문 출처 */}
              <div className="border border-gray-200 rounded p-2">
                <div className="text-[10px] font-medium text-gray-500 mb-0.5">주문 출처</div>
                <div className="text-xs text-gray-900">{order.orderSource}</div>
              </div>
              {/* 구매자명 */}
              <div className="border border-gray-200 rounded p-2">
                <div className="text-[10px] font-medium text-gray-500 mb-0.5">구매자명</div>
                <div className="text-xs text-gray-900">{order.buyerName}</div>
              </div>
              {/* 전화번호 */}
              <div className="border border-gray-200 rounded p-2">
                <div className="text-[10px] font-medium text-gray-500 mb-0.5">전화번호</div>
                <div className="text-xs text-gray-900">{order.phoneNumber}</div>
              </div>
              {/* 결제 금액 */}
              <div className="border border-gray-200 rounded p-2">
                <div className="text-[10px] font-medium text-gray-500 mb-0.5">결제 금액</div>
                <div className="text-xs text-gray-900">{order.paymentAmount.toLocaleString('ko-KR')}원</div>
              </div>
              {/* 품목주문 개수 */}
              <div className="border border-gray-200 rounded p-2">
                <div className="text-[10px] font-medium text-gray-500 mb-0.5">품목주문 개수</div>
                <div className="text-xs text-gray-900">{order.itemCount}개</div>
              </div>
              {/* 구매 유형 */}
              <div className="border border-gray-200 rounded p-2">
                <div className="text-[10px] font-medium text-gray-500 mb-0.5">구매 유형</div>
                <div className="text-xs text-gray-900">{order.purchaseType}</div>
              </div>
              {/* tag */}
              <div className="border border-gray-200 rounded p-2">
                <div className="text-[10px] font-medium text-gray-500 mb-0.5">tag</div>
                <div>
                  <span className="px-1.5 py-0.5 text-[10px] font-semibold rounded-full bg-blue-100 text-blue-800">
                    {order.tag}
                  </span>
                </div>
              </div>
              {/* 자사몰 상태 */}
              <div className="border border-gray-200 rounded p-2">
                <div className="text-[10px] font-medium text-gray-500 mb-0.5">자사몰 상태</div>
                <div>
                  <span className={`px-1.5 py-0.5 text-[10px] font-semibold rounded-full ${
                    order.mallStatus === '결제 완료' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {order.mallStatus}
                  </span>
                </div>
              </div>
              {/* 주문 상태 */}
              <div className="border border-gray-200 rounded p-2">
                <div className="text-[10px] font-medium text-gray-500 mb-0.5">주문 상태</div>
                <div>
                  <span className={`px-1.5 py-0.5 text-[10px] font-semibold rounded-full ${
                    order.orderStatus === '완료' 
                      ? 'bg-green-100 text-green-800'
                      : order.orderStatus === '진행중'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {order.orderStatus}
                  </span>
                </div>
              </div>
              {/* 서류 작성 상태 */}
              <div className="border border-gray-200 rounded p-2">
                <div className="text-[10px] font-medium text-gray-500 mb-0.5">서류 작성 상태</div>
                <div className="text-xs text-gray-900">{order.documentStatus}</div>
              </div>
              {/* 모두싸인 발송 여부 */}
              <div className="border border-gray-200 rounded p-2">
                <div className="text-[10px] font-medium text-gray-500 mb-0.5">모두싸인 발송 여부</div>
                <div>
                  {order.allSignDispatch ? (
                    <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <span className="text-gray-400 text-xs">-</span>
                  )}
                </div>
              </div>
              {/* 사업자 번호 */}
              <div className="border border-gray-200 rounded p-2">
                <div className="text-[10px] font-medium text-gray-500 mb-0.5">사업자 번호</div>
                <div className="text-xs text-gray-900">{order.businessNumber}</div>
              </div>
              {/* 제휴사 */}
              <div className="border border-gray-200 rounded p-2">
                <div className="text-[10px] font-medium text-gray-500 mb-0.5">제휴사</div>
                <div className="text-xs text-gray-900">{order.partner}</div>
              </div>
              {/* 상호명 */}
              <div className="border border-gray-200 rounded p-2">
                <div className="text-[10px] font-medium text-gray-500 mb-0.5">상호명</div>
                <div className="text-xs text-gray-900">{order.companyName}</div>
              </div>
              {/* 주소 */}
              <div className="border border-gray-200 rounded p-2">
                <div className="text-[10px] font-medium text-gray-500 mb-0.5">주소</div>
                <div className="text-xs text-gray-900">{order.address}</div>
              </div>
            </div>
          </div>

          {/* 품목주문 목록 섹션 */}
          <div className="flex-1 bg-white rounded-lg shadow p-3 overflow-hidden min-h-0">
            <h2 className="text-sm font-semibold text-gray-900 mb-2">품목주문 목록</h2>
            <div className="space-y-1.5">
              {orderItems.map((item, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded p-2 hover:bg-gray-50 transition-colors"
                >
                  <div className="text-xs font-medium text-gray-900">{item}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 우측: 히스토리 패널 (전체 화면의 30%) */}
        <div className="w-[30%] flex-shrink-0">
          <HistoryPanel
            orderId={order.id}
            histories={histories}
            onAddHistory={handleAddHistory}
            teams={TEAMS}
          />
        </div>
      </div>
    </div>
  )
}

