import { createContext, useContext, useState, ReactNode } from 'react'

type ApprovalContextType = {
  approvedMap: Map<string, boolean | null>
  setApprovedMap: React.Dispatch<React.SetStateAction<Map<string, boolean | null>>>
}

const ApprovalContext = createContext<ApprovalContextType | undefined>(undefined)

export const useApprovalContext = () => {
  const ctx = useContext(ApprovalContext)
  if (!ctx) throw new Error('ApprovalContext not found')
  return ctx
}

export const ApprovalProvider = ({ children }: { children: ReactNode }) => {
  const [approvedMap, setApprovedMap] = useState(new Map<string, boolean | null>())
  return (
    <ApprovalContext.Provider value={{ approvedMap, setApprovedMap }}>
      {children}
    </ApprovalContext.Provider>
  )
}
