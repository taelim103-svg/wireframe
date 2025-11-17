import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'

interface LNBProps {
  onToggle: () => void
}

export default function LNB({ onToggle }: LNBProps) {
  const location = useLocation()
  const isLeadsPath = location.pathname.startsWith('/leads')
  const [isLeadsOpen, setIsLeadsOpen] = useState(isLeadsPath)
  
  // 경로 변경 시 하위 메뉴 열림 상태 유지
  useEffect(() => {
    if (isLeadsPath) {
      setIsLeadsOpen(true)
    }
  }, [isLeadsPath])

  return (
    <nav className="w-64 bg-white border-r border-gray-200 flex flex-col">
      {/* ishopcare 로고 및 토글 버튼 */}
      <div className="h-16 flex items-center justify-between border-b border-gray-200 px-4">
        <div className="text-2xl font-bold text-blue-600">
          ishopcare
        </div>
        <button
          onClick={onToggle}
          className="p-1 hover:bg-gray-100 rounded transition-colors"
          aria-label="메뉴 숨기기"
        >
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </div>

      {/* 메뉴 */}
      <div className="flex-1 py-4">
        {/* 구매 상담 메뉴 (대시보드) */}
        <div>
          <div
            className={`flex items-center justify-between px-6 py-3 text-sm font-medium transition-colors cursor-pointer ${
              location.pathname.startsWith('/leads')
                ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Link
              to="/leads/online"
              className="flex-1"
              onClick={() => setIsLeadsOpen(!isLeadsOpen)}
            >
              구매 상담
            </Link>
            <button
              onClick={(e) => {
                e.preventDefault()
                setIsLeadsOpen(!isLeadsOpen)
              }}
              className="p-1"
            >
              <svg
                className={`w-4 h-4 transition-transform ${isLeadsOpen ? 'rotate-90' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          {isLeadsOpen && (
            <div className="bg-gray-50">
              <Link
                to="/leads/online"
                className={`block px-10 py-2 text-sm transition-colors ${
                  location.pathname === '/leads/online'
                    ? 'bg-blue-100 text-blue-700 font-medium'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                온라인
              </Link>
              <Link
                to="/leads/offline"
                className={`block px-10 py-2 text-sm transition-colors ${
                  location.pathname === '/leads/offline'
                    ? 'bg-blue-100 text-blue-700 font-medium'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                오프라인
              </Link>
            </div>
          )}
        </div>
        <Link
          to="/orders"
          className={`block px-6 py-3 text-sm font-medium transition-colors ${
            location.pathname.startsWith('/orders')
              ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
              : 'text-gray-700 hover:bg-gray-50'
          }`}
        >
          주문
        </Link>
        <Link
          to="/document-reviews"
          className={`block px-6 py-3 text-sm font-medium transition-colors ${
            location.pathname.startsWith('/document-reviews')
              ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
              : 'text-gray-700 hover:bg-gray-50'
          }`}
        >
          서류 검수
        </Link>
      </div>
    </nav>
  )
}

