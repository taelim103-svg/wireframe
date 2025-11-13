import { ReactNode, useState } from 'react'
import LNB from './LNB'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const [isLNBVisible, setIsLNBVisible] = useState(true)

  return (
    <div className="flex h-screen bg-gray-50">
      {isLNBVisible && <LNB onToggle={() => setIsLNBVisible(false)} />}
      {!isLNBVisible && (
        <button
          onClick={() => setIsLNBVisible(true)}
          className="fixed left-0 top-4 z-50 bg-white border-r border-b border-gray-200 rounded-r-lg p-2 hover:bg-gray-50 transition-colors shadow-sm"
          aria-label="메뉴 열기"
        >
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  )
}

