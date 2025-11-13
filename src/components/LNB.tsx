import { Link, useLocation } from 'react-router-dom'

interface LNBProps {
  onToggle: () => void
}

export default function LNB({ onToggle }: LNBProps) {
  const location = useLocation()

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
          to="/leads"
          className={`block px-6 py-3 text-sm font-medium transition-colors ${
            location.pathname.startsWith('/leads')
              ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
              : 'text-gray-700 hover:bg-gray-50'
          }`}
        >
          구매 상담
        </Link>
      </div>
    </nav>
  )
}

