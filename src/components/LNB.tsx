import { Link, useLocation } from 'react-router-dom'

export default function LNB() {
  const location = useLocation()

  return (
    <nav className="w-64 bg-white border-r border-gray-200 flex flex-col">
      {/* ishopcare 로고 */}
      <div className="h-16 flex items-center justify-center border-b border-gray-200 px-4">
        <div className="text-2xl font-bold text-blue-600">
          ishopcare
        </div>
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
      </div>
    </nav>
  )
}

