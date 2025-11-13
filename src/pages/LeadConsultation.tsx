import { useState, useMemo } from 'react'
import { mockLeads } from '../data/leadsData'
import { Lead, LeadStatus, Media, BusinessType } from '../types/order'

const STATUSES: LeadStatus[] = ['리드 인입', '상담 시도', '상담중', '구매', '실패']

const STATUS_COLORS: Record<LeadStatus, string> = {
  '리드 인입': 'bg-gray-50',
  '상담 시도': 'bg-pink-50',
  '상담중': 'bg-yellow-50',
  '구매': 'bg-green-50',
  '실패': 'bg-red-50'
}

const STATUS_HEADER_COLORS: Record<LeadStatus, string> = {
  '리드 인입': 'bg-gray-100',
  '상담 시도': 'bg-pink-100',
  '상담중': 'bg-yellow-100',
  '구매': 'bg-green-100',
  '실패': 'bg-red-100'
}

export default function LeadConsultation() {
  const [leads, setLeads] = useState<Lead[]>(mockLeads)
  const [draggedLead, setDraggedLead] = useState<Lead | null>(null)
  const [dragOverStatus, setDragOverStatus] = useState<LeadStatus | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [leadStatus, setLeadStatus] = useState<LeadStatus | 'all'>('all')
  const [media, setMedia] = useState<Media | 'all'>('all')
  const [businessType, setBusinessType] = useState<BusinessType | 'all'>('all')
  const [dateRange, setDateRange] = useState({ start: '', end: '' })

  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      // 검색어 필터
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase()
        const matchesSearch =
          lead.storeName.toLowerCase().includes(searchLower) ||
          lead.phoneNumber.toLowerCase().includes(searchLower)
        if (!matchesSearch) return false
      }

      // 리드 상태 필터
      if (leadStatus !== 'all' && lead.status !== leadStatus) {
        return false
      }

      // 매체 필터
      if (media !== 'all' && lead.media !== media) {
        return false
      }

      // 업종 필터
      if (businessType !== 'all' && lead.businessType !== businessType) {
        return false
      }

      // 날짜 범위 필터
      if (dateRange.start || dateRange.end) {
        const leadDate = new Date(lead.createdAt.split(' ')[0])
        if (dateRange.start) {
          const startDate = new Date(dateRange.start)
          if (leadDate < startDate) return false
        }
        if (dateRange.end) {
          const endDate = new Date(dateRange.end)
          if (leadDate > endDate) return false
        }
      }

      return true
    })
  }, [leads, searchTerm, leadStatus, media, businessType, dateRange])

  const handleDragStart = (e: React.DragEvent, lead: Lead) => {
    setDraggedLead(lead)
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text/html', lead.id)
  }

  const handleDragOver = (e: React.DragEvent, status: LeadStatus) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
    setDragOverStatus(status)
  }

  const handleDragLeave = () => {
    setDragOverStatus(null)
  }

  const handleDrop = (e: React.DragEvent, targetStatus: LeadStatus) => {
    e.preventDefault()
    setDragOverStatus(null)
    
    if (draggedLead) {
      setLeads(leads.map(lead => 
        lead.id === draggedLead.id 
          ? { ...lead, status: targetStatus }
          : lead
      ))
      setDraggedLead(null)
    }
  }

  const handleDragEnd = () => {
    setDraggedLead(null)
    setDragOverStatus(null)
  }

  const getLeadsByStatus = (status: LeadStatus) => {
    return filteredLeads.filter(lead => lead.status === status)
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6 pl-12">구매 상담</h1>
      
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
              placeholder="가맹점 이름, 전화번호로 검색"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div className="text-sm text-gray-600 font-medium">
            총 {filteredLeads.length}개
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

          {/* 리드 상태 */}
          <select
            value={leadStatus}
            onChange={(e) => setLeadStatus(e.target.value as LeadStatus | 'all')}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">리드 상태</option>
            <option value="리드 인입">리드 인입</option>
            <option value="상담 시도">상담 시도</option>
            <option value="상담중">상담중</option>
            <option value="구매">구매</option>
            <option value="실패">실패</option>
          </select>

          {/* 매체 */}
          <select
            value={media}
            onChange={(e) => setMedia(e.target.value as Media | 'all')}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">매체</option>
            <option value="네이버">네이버</option>
            <option value="구글">구글</option>
            <option value="인스타그램">인스타그램</option>
            <option value="페이스북">페이스북</option>
            <option value="기타">기타</option>
          </select>

          {/* 업종 */}
          <select
            value={businessType}
            onChange={(e) => setBusinessType(e.target.value as BusinessType | 'all')}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">업종</option>
            <option value="음식점">음식점</option>
            <option value="카페">카페</option>
            <option value="편의점">편의점</option>
            <option value="마트">마트</option>
            <option value="기타">기타</option>
          </select>
        </div>
      </div>
      
      <div className="flex gap-4 overflow-x-auto pb-4">
        {STATUSES.map((status) => {
          const leadsInStatus = getLeadsByStatus(status)
          const isDragOver = dragOverStatus === status
          
          return (
            <div
              key={status}
              className="flex-shrink-0 w-80"
              onDragOver={(e) => handleDragOver(e, status)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, status)}
            >
              {/* 컬럼 헤더 */}
              <div className={`${STATUS_HEADER_COLORS[status]} rounded-t-lg px-4 py-3 border-b border-gray-200`}>
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-semibold text-gray-900">{status}</h2>
                  <span className="bg-white text-gray-600 text-xs font-medium px-2 py-1 rounded-full">
                    {leadsInStatus.length}
                  </span>
                </div>
              </div>

              {/* 카드 목록 */}
              <div 
                className={`${STATUS_COLORS[status]} rounded-b-lg p-3 min-h-[600px] space-y-3 transition-colors ${
                  isDragOver ? 'ring-2 ring-blue-500 ring-offset-2' : ''
                }`}
              >
                {leadsInStatus.length === 0 ? (
                  <div className="text-center text-gray-400 text-sm py-8">
                    {filteredLeads.length === 0 ? '검색 결과가 없습니다' : '이 상태의 리드가 없습니다'}
                  </div>
                ) : (
                  leadsInStatus.map((lead) => {
                    const isDragging = draggedLead?.id === lead.id
                    return (
                      <div
                        key={lead.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, lead)}
                        onDragEnd={handleDragEnd}
                        className={`bg-white rounded-lg shadow-sm border border-gray-200 p-3 cursor-move hover:shadow-md transition-all ${
                          isDragging ? 'opacity-50' : ''
                        }`}
                      >
                        <div className="space-y-2">
                          <div className="font-medium text-sm text-gray-900">{lead.storeName}</div>
                          <div className="text-xs text-gray-600 space-y-1">
                            <div className="flex items-center gap-1">
                              <span>📞</span>
                              <span>{lead.phoneNumber}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <span>🏪</span>
                              <span>{lead.businessType}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <span>📢</span>
                              <span>{lead.media}</span>
                            </div>
                            {lead.absentCount > 0 && (
                              <div className="text-orange-600 font-medium mt-1">
                                {lead.absentCount}차 부재
                              </div>
                            )}
                          </div>
                          
                          {/* 담당자 */}
                          <div className="text-xs text-gray-600 mt-2">
                            <span className="font-medium">담당자:</span> {lead.assignedTo}
                          </div>
                          
                          {/* 특이사항 */}
                          <div className="text-xs text-gray-600 mt-1">
                            <span className="font-medium">특이사항:</span> {lead.specialNote}
                          </div>
                          
                          {/* 실패 사유 (실패 상태일 때만) */}
                          {lead.status === '실패' && lead.failureReason && (
                            <div className="text-xs text-red-600 mt-1 font-medium">
                              실패 사유: {lead.failureReason}
                            </div>
                          )}
                          
                          {/* 중복 여부, 구매 여부 */}
                          <div className="flex items-center gap-3 mt-2">
                            <div className="flex items-center gap-1">
                              {lead.isDuplicate ? (
                                <svg className="w-4 h-4 text-blue-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              ) : (
                                <div className="w-4 h-4 border border-gray-300 rounded flex-shrink-0"></div>
                              )}
                              <span className="text-xs text-gray-600">중복</span>
                            </div>
                            <div className="flex items-center gap-1">
                              {lead.isPurchased ? (
                                <svg className="w-4 h-4 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              ) : (
                                <div className="w-4 h-4 border border-gray-300 rounded flex-shrink-0"></div>
                              )}
                              <span className="text-xs text-gray-600">구매</span>
                            </div>
                          </div>
                          
                          {/* 시간 정보 */}
                          <div className="text-xs text-gray-500 pt-2 border-t border-gray-100 space-y-1">
                            <div className="flex items-start gap-1">
                              <span className="font-medium text-gray-600 whitespace-nowrap">리드 인입</span>
                              <span className="text-gray-400">{lead.createdAt}</span>
                            </div>
                            {lead.lastConsultationAt && (
                              <div className="flex items-start gap-1">
                                <span className="font-medium text-gray-600 whitespace-nowrap">마지막 상담</span>
                                <span className="text-gray-400">{lead.lastConsultationAt}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )
                  })
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

