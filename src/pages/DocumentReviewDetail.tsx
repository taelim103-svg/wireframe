import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { mockDocumentReviews } from '../data/documentReviewsData'
import { mockOrders, mockHistories } from '../data/mockData'
import { DocumentReview, History, Team } from '../types/order'
import HistoryPanel from '../components/HistoryPanel'

const TEAMS: Team[] = ['서류검수', '운영관리', 'md', 'scm', 'cx']

const ATTACHMENT_FILES = [
  '계약서',
  '사업자등록증',
  '대표자신분증',
  '통장사본',
  '영업신고증',
  '매장외부사진',
  '매장내부사진'
]

export default function DocumentReviewDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [review, setReview] = useState<DocumentReview | null>(null)
  const [histories, setHistories] = useState<History[]>([])

  useEffect(() => {
    const foundReview = mockDocumentReviews.find(r => r.id === id)
    if (foundReview) {
      setReview(foundReview)
      
      // 같은 주문번호를 가진 주문 찾기
      const relatedOrder = mockOrders.find(o => o.orderNumber === foundReview.orderNumber)
      
      if (relatedOrder) {
        // 같은 주문의 히스토리 가져오기
        const orderHistories = mockHistories.filter(h => h.orderId === relatedOrder.id)
        
        // 주문 상품 정보 히스토리 자동 생성
        const productHistory: History = {
          id: `product-${relatedOrder.id}`,
          orderId: relatedOrder.id,
          content: `상품주문번호 : ${relatedOrder.productOrderNumber}
상품코드 : ${relatedOrder.productCode}
상품명 : ${relatedOrder.productName}
수량 : ${relatedOrder.productQuantity}개
상품옵션 : ${relatedOrder.productOptions}`,
          mentionedTeams: [],
          createdAt: relatedOrder.orderTime,
          createdBy: '시스템'
        }
        
        // 서류제출-제출완료 상태일 때 추가 히스토리 생성
        const documentHistory: History | null = relatedOrder.documentStatus === '서류제출-제출완료' ? {
          id: `document-${relatedOrder.id}`,
          orderId: relatedOrder.id,
          content: `서류 작성 상태 변경: 서류제출-제출완료
상호명 : ${relatedOrder.companyName}
사업자번호 : ${relatedOrder.businessNumber}`,
          mentionedTeams: [],
          createdAt: relatedOrder.orderTime,
          createdBy: '시스템'
        } : null
        
        // 히스토리 순서: 상품 정보 (가장 오래된) -> 서류 상태 (있는 경우) -> 기존 히스토리
        const allHistories = [productHistory, documentHistory, ...orderHistories].filter(Boolean) as History[]
        // 시간순으로 정렬 (최신이 위로)
        allHistories.sort((a, b) => {
          const dateA = new Date(a.createdAt).getTime()
          const dateB = new Date(b.createdAt).getTime()
          return dateB - dateA
        })
        setHistories(allHistories)
      } else {
        // 주문이 없으면 빈 히스토리
        setHistories([])
      }
    }
  }, [id])

  if (!review) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <p className="text-gray-500">서류 검수를 찾을 수 없습니다.</p>
          <button
            onClick={() => navigate('/document-reviews')}
            className="mt-4 text-blue-600 hover:text-blue-800"
          >
            목록으로 돌아가기
          </button>
        </div>
      </div>
    )
  }

  const handleAddHistory = (content: string, mentionedTeams: Team[], images?: string[]) => {
    // 같은 주문번호를 가진 주문 찾기
    const relatedOrder = mockOrders.find(o => o.orderNumber === review.orderNumber)
    if (!relatedOrder) return

    const newHistory: History = {
      id: Date.now().toString(),
      orderId: relatedOrder.id,
      content,
      mentionedTeams,
      createdAt: new Date().toLocaleString('ko-KR'),
      createdBy: '관리자',
      images: images || []
    }
    setHistories([newHistory, ...histories])
  }

  const handleMerchantNumberCheck = () => {
    alert(`가맹번호 확인 기능 (사업자번호: ${review.businessNumber})`)
  }

  return (
    <div className="p-2">
      <div className="mb-2 pl-12">
        <button
          onClick={() => navigate('/document-reviews')}
          className="text-blue-600 hover:text-blue-800 mb-1 text-sm"
        >
          ← 목록으로
        </button>
        <h1 className="text-lg font-bold text-gray-900">서류 검수 상세</h1>
      </div>

      <div className="flex gap-2 h-[calc(100vh-5rem)]">
        {/* 왼쪽: 서류 검수 정보 및 첨부 파일 (세로 배치) */}
        <div className="flex-1 flex flex-col gap-2 min-h-0">
          {/* 서류 검수 정보 섹션 */}
          <div className="bg-white rounded-lg shadow p-3 overflow-hidden">
            <h2 className="text-sm font-semibold text-gray-900 mb-2">서류 검수 정보</h2>
            <div className="grid grid-cols-2 gap-2">
              {/* 검수 상태 */}
              <div className="border border-gray-200 rounded p-2">
                <div className="text-[10px] font-medium text-gray-500 mb-0.5">검수 상태</div>
                <div>
                  <span className={`px-1.5 py-0.5 text-[10px] font-semibold rounded-full ${
                    review.reviewStatus === '완료' ? 'bg-green-100 text-green-800' :
                    review.reviewStatus === '진행중' ? 'bg-yellow-100 text-yellow-800' :
                    review.reviewStatus === '보완 요청' ? 'bg-orange-100 text-orange-800' :
                    review.reviewStatus === '보완 확인필요' ? 'bg-blue-100 text-blue-800' :
                    review.reviewStatus === '취소' ? 'bg-red-100 text-red-800' :
                    review.reviewStatus === '이슈' ? 'bg-purple-100 text-purple-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {review.reviewStatus}
                  </span>
                </div>
              </div>
              {/* 청약 업무수 */}
              <div className="border border-gray-200 rounded p-2">
                <div className="text-[10px] font-medium text-gray-500 mb-0.5">청약 업무수</div>
                <div className="text-xs text-gray-900">{review.subscriptionTaskCount}</div>
              </div>
              {/* i-partners 생성 여부 */}
              <div className="border border-gray-200 rounded p-2">
                <div className="text-[10px] font-medium text-gray-500 mb-0.5">i-partners 생성 여부</div>
                <div>
                  {review.iPartnersCreated ? (
                    <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <span className="text-gray-400 text-xs">-</span>
                  )}
                </div>
              </div>
              {/* 등록일시 */}
              <div className="border border-gray-200 rounded p-2">
                <div className="text-[10px] font-medium text-gray-500 mb-0.5">등록일시</div>
                <div className="text-xs text-gray-900">{review.registeredAt}</div>
              </div>
              {/* 최근 변경일시 */}
              <div className="border border-gray-200 rounded p-2">
                <div className="text-[10px] font-medium text-gray-500 mb-0.5">최근 변경일시</div>
                <div className="text-xs text-gray-900">{review.lastModifiedAt}</div>
              </div>
              {/* 주문번호 */}
              <div className="border border-gray-200 rounded p-2">
                <div className="text-[10px] font-medium text-gray-500 mb-0.5">주문번호</div>
                <div className="text-xs font-medium text-gray-900">{review.orderNumber}</div>
              </div>
              {/* 상호명 */}
              <div className="border border-gray-200 rounded p-2">
                <div className="text-[10px] font-medium text-gray-500 mb-0.5">상호명</div>
                <div className="text-xs text-gray-900">{review.companyName}</div>
              </div>
              {/* 사업자번호 + 가맹번호 확인 버튼 */}
              <div className="border border-gray-200 rounded p-2">
                <div className="text-[10px] font-medium text-gray-500 mb-0.5">사업자번호</div>
                <div className="flex items-center gap-2">
                  <div className="text-xs text-gray-900 flex-1">{review.businessNumber}</div>
                  <button
                    onClick={handleMerchantNumberCheck}
                    className="px-2 py-1 text-[10px] bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors whitespace-nowrap"
                  >
                    가맹번호 확인
                  </button>
                </div>
              </div>
              {/* 모두싸인 문서제목 */}
              <div className="border border-gray-200 rounded p-2">
                <div className="text-[10px] font-medium text-gray-500 mb-0.5">모두싸인 문서제목</div>
                <div className="text-xs text-gray-900">{review.allSignDocumentTitle}</div>
              </div>
              {/* 서류 검수자 */}
              <div className="border border-gray-200 rounded p-2">
                <div className="text-[10px] font-medium text-gray-500 mb-0.5">서류 검수자</div>
                <div className="text-xs text-gray-900">{review.reviewer || '-'}</div>
              </div>
              {/* 선출고 여부 */}
              <div className="border border-gray-200 rounded p-2">
                <div className="text-[10px] font-medium text-gray-500 mb-0.5">선출고 여부</div>
                <div>
                  {review.preShipping ? (
                    <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <span className="text-gray-400 text-xs">-</span>
                  )}
                </div>
              </div>
              {/* 검수완료일시 */}
              <div className="border border-gray-200 rounded p-2">
                <div className="text-[10px] font-medium text-gray-500 mb-0.5">검수완료일시</div>
                <div className="text-xs text-gray-900">{review.reviewCompletedAt || '-'}</div>
              </div>
              {/* 카드사 가맹유형 */}
              <div className="border border-gray-200 rounded p-2">
                <div className="text-[10px] font-medium text-gray-500 mb-0.5">카드사 가맹유형</div>
                <div className="text-xs text-gray-900">{review.cardMerchantType}</div>
              </div>
              {/* 사업자 유형 */}
              <div className="border border-gray-200 rounded p-2">
                <div className="text-[10px] font-medium text-gray-500 mb-0.5">사업자 유형</div>
                <div className="text-xs text-gray-900">{review.businessOwnerType}</div>
              </div>
            </div>
          </div>

          {/* 첨부 파일 섹션 */}
          <div className="flex-1 bg-white rounded-lg shadow p-2 overflow-hidden min-h-0">
            <h2 className="text-xs font-semibold text-gray-900 mb-1.5">첨부 파일</h2>
            <div className="grid grid-cols-7 gap-1">
              {ATTACHMENT_FILES.map((fileName, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded p-0.5 hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <div className="aspect-square bg-gray-100 rounded mb-0.5 flex items-center justify-center">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div className="text-[8px] font-medium text-gray-900 text-center truncate leading-tight">{fileName}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 우측: 히스토리 패널 (전체 화면의 30%) */}
        <div className="w-[30%] flex-shrink-0">
          <HistoryPanel
            orderId={review.orderNumber}
            histories={histories}
            onAddHistory={handleAddHistory}
            teams={TEAMS}
          />
        </div>
      </div>
    </div>
  )
}

