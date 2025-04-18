import { ViewportContext } from '@/App'
import { memo, useContext } from 'react'
import { Outlet } from 'react-router-dom'
import HeaderBar from './HeaderBar'
import MobileMenuHeader from './MobileMenuHeader'

const PageFrame = () => {
  const { isMobile } = useContext(ViewportContext)

  return (
    <div className="flex flex-col min-h-screen">
      {!isMobile && <HeaderBar />}
      <main className="flex-grow">
        <Outlet />
      </main>
      {isMobile && <MobileMenuHeader />}
    </div>
  )
}

export default memo(PageFrame)
