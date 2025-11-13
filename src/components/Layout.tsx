import { ReactNode } from 'react'
import LNB from './LNB'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex h-screen bg-gray-50">
      <LNB />
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  )
}

