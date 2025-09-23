import { getUnreadNotificationCount } from '@/services/notificationService'
import { useQuery } from '@tanstack/react-query'
import { createContext, useContext, useEffect, useState } from 'react'

type NotificationContextType = {
  unreadCount: number
  refetchUnread: () => void
}

const NotificationContext = createContext<NotificationContextType>({
  unreadCount: 0,
  refetchUnread: () => {},
})

export const useNotificationContext = () => useContext(NotificationContext)

export const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => !!localStorage.getItem('token'))

  useEffect(() => {
    const checkToken = () => {
      setIsLoggedIn(!!localStorage.getItem('token'))
    }

    window.addEventListener('storage', checkToken)
    return () => window.removeEventListener('storage', checkToken)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setIsLoggedIn(!!localStorage.getItem('token'))
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const { data = 0, refetch } = useQuery({
    queryKey: ['notification-unread-count'],
    queryFn: getUnreadNotificationCount,
    enabled: isLoggedIn,
    refetchInterval: isLoggedIn ? 5000 : false,
  })

  return (
    <NotificationContext.Provider value={{ unreadCount: data, refetchUnread: refetch }}>
      {children}
    </NotificationContext.Provider>
  )
}
