import { ViewportContext } from '@/App'
import { memo, useContext } from 'react'
import { Outlet } from 'react-router-dom'
import HeaderBar from './HeaderBar'
import MobileMenuHeader from './MobileMenuHeader'

const PageFrame = () => {
  const { isMobile } = useContext(ViewportContext)

  return (
    <div className="grid grid-rows-[auto_1fr_auto] h-screen w-full">
      <header className="w-full">{!isMobile && <HeaderBar />}</header>
      <main className="w-full overflow-y-auto overflow-x-clip">
        <Outlet />
      </main>
      <footer className="w-full ">{isMobile && <MobileMenuHeader />}</footer>
    </div>
  )
}

export default memo(PageFrame)
