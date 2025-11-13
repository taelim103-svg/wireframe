import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { mockOrders } from '../data/mockData'
import { Order, OrderStatus, PurchaseType, Partner } from '../types/order'

export default function OrderList() {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [orderStatus, setOrderStatus] = useState<OrderStatus | 'all'>('all')
  const [purchaseType, setPurchaseType] = useState<PurchaseType | 'all'>('all')
  const [partner, setPartner] = useState<Partner | 'all'>('all')
  const [dateRange, setDateRange] = useState({ start: '', end: '' })

  const handleOrderClick = (order: Order) => {
    navigate(`/orders/${order.id}`)
  }

  const filteredOrders = useMemo(() => {
    return mockOrders.filter((order) => {
      // 검색어 필터
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase()
        const matchesSearch =
          order.orderNumber.toLowerCase().includes(searchLower) ||
          order.companyName.toLowerCase().includes(searchLower) ||
          order.businessNumber.toLowerCase().includes(searchLower)
        if (!matchesSearch) return false
      }

      // 주문 상태 필터
      if (orderStatus !== 'all' && order.orderStatus !== orderStatus) {
        return false
      }

      // 구매 유형 필터
      if (purchaseType !== 'all' && order.purchaseType !== purchaseType) {
        return false
      }

      // 제휴사 필터
      if (partner !== 'all' && order.partner !== partner) {
        return false
      }

      // 날짜 범위 필터
      if (dateRange.start || dateRange.end) {
        const orderDate = new Date(order.orderTime.split(' ')[0])
        if (dateRange.start) {
          const startDate = new Date(dateRange.start)
          if (orderDate < startDate) return false
        }
        if (dateRange.end) {
          const endDate = new Date(dateRange.end)
          if (orderDate > endDate) return false
        }
      }

      return true
    })
  }, [searchTerm, orderStatus, purchaseType, partner, dateRange])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6 pl-12">주문 관리</h1>
      
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
            총 {filteredOrders.length}개
          </div>
        </div>

        {/* 필터 드롭다운들 */}
        <div className="flex items-center gap-4 flex-wrap">
          {/* 주문 일자 기간 */}
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

          {/* 주문 상태 */}
          <select
            value={orderStatus}
            onChange={(e) => setOrderStatus(e.target.value as OrderStatus | 'all')}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">주문 상태</option>
            <option value="진행중">진행중</option>
            <option value="취소">취소</option>
            <option value="완료">완료</option>
          </select>

          {/* 구매 유형 */}
          <select
            value={purchaseType}
            onChange={(e) => setPurchaseType(e.target.value as PurchaseType | 'all')}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">구매 유형</option>
            <option value="온라인">온라인</option>
            <option value="온라인 CMS">온라인 CMS</option>
            <option value="오프라인">오프라인</option>
            <option value="오프라인 CMS">오프라인 CMS</option>
            <option value="-">-</option>
          </select>

          {/* 제휴사 */}
          <select
            value={partner}
            onChange={(e) => setPartner(e.target.value as Partner | 'all')}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">제휴사</option>
            <option value="배달의 민족">배달의 민족</option>
            <option value="쿠팡이츠">쿠팡이츠</option>
            <option value="요기요">요기요</option>
            <option value="떙겨요">떙겨요</option>
          </select>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  주문 번호
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  구매 유형
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  tag
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  자사몰 상태
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  주문 상태
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  서류 작성 상태
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  모두싸인 발송 여부
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  사업자 번호
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  제휴사
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center">
                      <svg className="h-12 w-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <p className="text-gray-500 text-sm">주문 내역이 없어요</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr
                    key={order.id}
                    onClick={() => handleOrderClick(order)}
                    className="hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {order.orderNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.purchaseType}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                        {order.tag}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        order.mallStatus === '결제 완료' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {order.mallStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        order.orderStatus === '완료' 
                          ? 'bg-green-100 text-green-800'
                          : order.orderStatus === '진행중'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {order.orderStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.documentStatus}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      {order.allSignDispatch ? (
                        <svg className="w-5 h-5 text-green-600 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.businessNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.partner}
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

