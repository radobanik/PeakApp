import HeaderBar from '@/components/HeaderBar'
import { Outlet } from 'react-router-dom'

export default function BackfofficeLayout() {
  return (
    <main className="flex flex-col h-screen">
      <HeaderBar />
      <div className="flex flex-1 p-2 overflow-hidden">
        <Outlet />
      </div>
    </main>
  )
}
