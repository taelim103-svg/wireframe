import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { mockDocumentReviews } from '../data/documentReviewsData'
import { DocumentReview, ReviewStatus, CardMerchantType, BusinessOwnerType } from '../types/order'

const STATUS_COLORS: Record<ReviewStatus, string> = {
  '대기': 'bg-gray-100 text-gray-800',
  '진행중': 'bg-yellow-100 text-yellow-800',
  '보완 요청': 'bg-orange-100 text-orange-800',
  '보완 확인필요': 'bg-blue-100 text-blue-800',
  '완료': 'bg-green-100 text-green-800',
  '취소': 'bg-red-100 text-red-800',
  '이슈': 'bg-purple-100 text-purple-800'
}

export default function DocumentReviewList() {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [reviewStatus, setReviewStatus] = useState<ReviewStatus | 'all'>('all')
  const [cardMerchantType, setCardMerchantType] = useState<CardMerchantType | 'all'>('all')
  const [businessOwnerType, setBusinessOwnerType] = useState<BusinessOwnerType | 'all'>('all')
  const [dateRange, setDateRange] = useState({ start: '', end: '' })

  const filteredReviews = useMemo(() => {
    return mockDocumentReviews.filter((review) => {
      // 검색어 필터
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase()
        const matchesSearch =
          review.orderNumber.toLowerCase().includes(searchLower) ||
          review.companyName.toLowerCase().includes(searchLower) ||
          review.businessNumber.toLowerCase().includes(searchLower)
        if (!matchesSearch) return false
      }

      // 검수 상태 필터
      if (reviewStatus !== 'all' && review.reviewStatus !== reviewStatus) {
        return false
      }

      // 카드사 가맹유형 필터
      if (cardMerchantType !== 'all' && review.cardMerchantType !== cardMerchantType) {
        return false
      }

      // 사업자 유형 필터
      if (businessOwnerType !== 'all' && review.businessOwnerType !== businessOwnerType) {
        return false
      }

      // 날짜 범위 필터
      if (dateRange.start || dateRange.end) {
        const reviewDate = new Date(review.registeredAt.split(' ')[0])
        if (dateRange.start) {
          const startDate = new Date(dateRange.start)
          if (reviewDate < startDate) return false
        }
        if (dateRange.end) {
          const endDate = new Date(dateRange.end)
          if (reviewDate > endDate) return false
        }
      }

      return true
    })
  }, [searchTerm, reviewStatus, cardMerchantType, businessOwnerType, dateRange])

  const handleReviewClick = (review: DocumentReview) => {
    navigate(`/document-reviews/${review.id}`)
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold text-gray-900 mb-4 pl-12">서류 검수</h1>
      
      {/* 검색 및 필터 섹션 */}
      <div className="bg-white rounded-lg shadow p-4 mb-4">
        {/* 검색 바 */}
        <div className="flex items-center gap-4 mb-4">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="주문번호, 상호명, 사업자번호로 검색"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div className="text-sm text-gray-600 font-medium">
            총 {filteredReviews.length}개
          </div>
        </div>

        {/* 필터 드롭다운들 */}
        <div className="flex items-center gap-4 flex-wrap">
          {/* 등록일자 기간 */}
          <div className="flex items-center gap-2">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <input
              type="date"
              value={dateRange.start}
              onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
            <span className="text-gray-500">~</span>
            <input
              type="date"
              value={dateRange.end}
              onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* 검수 상태 */}
          <select
            value={reviewStatus}
            onChange={(e) => setReviewStatus(e.target.value as ReviewStatus | 'all')}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">검수 상태</option>
            <option value="대기">대기</option>
            <option value="진행중">진행중</option>
            <option value="보완 요청">보완 요청</option>
            <option value="보완 확인필요">보완 확인필요</option>
            <option value="완료">완료</option>
            <option value="취소">취소</option>
            <option value="이슈">이슈</option>
          </select>

          {/* 카드사 가맹유형 */}
          <select
            value={cardMerchantType}
            onChange={(e) => setCardMerchantType(e.target.value as CardMerchantType | 'all')}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">카드사 가맹유형</option>
            <option value="신규">신규</option>
            <option value="기가맹">기가맹</option>
          </select>

          {/* 사업자 유형 */}
          <select
            value={businessOwnerType}
            onChange={(e) => setBusinessOwnerType(e.target.value as BusinessOwnerType | 'all')}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">사업자 유형</option>
            <option value="개인-단독대표">개인-단독대표</option>
            <option value="개인-공동대표">개인-공동대표</option>
            <option value="법인-단독대표">법인-단독대표</option>
            <option value="법인-공동대표">법인-공동대표</option>
          </select>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-2 py-2 text-left text-[10px] font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  검수 상태
                </th>
                <th className="px-2 py-2 text-left text-[10px] font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  청약 업무수
                </th>
                <th className="px-2 py-2 text-left text-[10px] font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  i-partners 생성 여부
                </th>
                <th className="px-2 py-2 text-left text-[10px] font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  등록일시
                </th>
                <th className="px-2 py-2 text-left text-[10px] font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  최근 변경일시
                </th>
                <th className="px-2 py-2 text-left text-[10px] font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  주문번호
                </th>
                <th className="px-2 py-2 text-left text-[10px] font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  상호명
                </th>
                <th className="px-2 py-2 text-left text-[10px] font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  사업자번호
                </th>
                <th className="px-2 py-2 text-left text-[10px] font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  모두싸인 문서제목
                </th>
                <th className="px-2 py-2 text-left text-[10px] font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  서류 검수자
                </th>
                <th className="px-2 py-2 text-left text-[10px] font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  선출고 여부
                </th>
                <th className="px-2 py-2 text-left text-[10px] font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  검수완료일시
                </th>
                <th className="px-2 py-2 text-left text-[10px] font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  카드사 가맹유형
                </th>
                <th className="px-2 py-2 text-left text-[10px] font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  사업자 유형
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredReviews.length === 0 ? (
                <tr>
                  <td colSpan={14} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center">
                      <svg className="h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <p className="text-gray-500 text-sm">검색 결과가 없습니다</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredReviews.map((review) => (
                <tr 
                  key={review.id} 
                  onClick={() => handleReviewClick(review)}
                  className="hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <td className="px-2 py-2 whitespace-nowrap">
                    <span className={`px-1.5 py-0.5 text-[10px] font-semibold rounded-full ${STATUS_COLORS[review.reviewStatus]}`}>
                      {review.reviewStatus}
                    </span>
                  </td>
                  <td className="px-2 py-2 whitespace-nowrap text-xs text-gray-900">
                    {review.subscriptionTaskCount}
                  </td>
                  <td className="px-2 py-2 whitespace-nowrap text-center">
                    {review.iPartnersCreated ? (
                      <svg className="w-4 h-4 text-green-600 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <span className="text-gray-400 text-xs">-</span>
                    )}
                  </td>
                  <td className="px-2 py-2 whitespace-nowrap text-xs text-gray-500">
                    {review.registeredAt}
                  </td>
                  <td className="px-2 py-2 whitespace-nowrap text-xs text-gray-500">
                    {review.lastModifiedAt}
                  </td>
                  <td className="px-2 py-2 whitespace-nowrap text-xs font-medium text-gray-900">
                    {review.orderNumber}
                  </td>
                  <td className="px-2 py-2 whitespace-nowrap text-xs text-gray-900">
                    {review.companyName}
                  </td>
                  <td className="px-2 py-2 whitespace-nowrap text-xs text-gray-500">
                    {review.businessNumber}
                  </td>
                  <td className="px-2 py-2 whitespace-nowrap text-xs text-gray-900">
                    {review.allSignDocumentTitle}
                  </td>
                  <td className="px-2 py-2 whitespace-nowrap text-xs text-gray-500">
                    {review.reviewer || '-'}
                  </td>
                  <td className="px-2 py-2 whitespace-nowrap text-center">
                    {review.preShipping ? (
                      <svg className="w-4 h-4 text-green-600 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <span className="text-gray-400 text-xs">-</span>
                    )}
                  </td>
                  <td className="px-2 py-2 whitespace-nowrap text-xs text-gray-500">
                    {review.reviewCompletedAt || '-'}
                  </td>
                  <td className="px-2 py-2 whitespace-nowrap text-xs text-gray-900">
                    {review.cardMerchantType}
                  </td>
                  <td className="px-2 py-2 whitespace-nowrap text-xs text-gray-900">
                    {review.businessOwnerType}
                  </td>
                </tr>
              ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

