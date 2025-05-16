import { useContext } from 'react'
import BackButon from './BackButton'
import { EntityOptionsDropdown } from './ui/custom/entity-option-dropdown'
import { ROUTE } from '@/constants/routes'
import { SessionDetailContext } from '@/pages/SessionDetailPage'

export default function EntityDetailHeader() {
  const { setIsDeleteDialogOpen, setIsEdit } = useContext(SessionDetailContext)

  return (
    <div className="flex flex-row justify-between p-4">
      <BackButon backRoute={ROUTE.ACTIVITIES} />
      <EntityOptionsDropdown setDelete={setIsDeleteDialogOpen} setIsEdit={setIsEdit} />
    </div>
  )
}
