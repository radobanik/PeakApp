import { Outlet } from 'react-router-dom'

export default function BackfofficeLayout() {
  return (
    <main className="flex flex-col h-screen">
      <div className="flex flex-1 p-2 overflow-hidden">
        <Outlet />
      </div>
    </main>
  )
}
