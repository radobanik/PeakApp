import { useContext } from 'react'
import BackButon from './BackButton'
import { EntityOptionsDropdown } from './ui/custom/entity-option-dropdown'
import { SessionDetailContext } from '@/pages/SessionDetailPage'

type EntityDetailHeaderProps = {
  backRoute: string
}

export default function EntityDetailHeader({ backRoute }: EntityDetailHeaderProps) {
  const { setIsDeleteDialogOpen, setIsEdit } = useContext(SessionDetailContext)

  return (
    <div className="flex flex-row justify-between p-4">
      <BackButon backRoute={backRoute} />
      <EntityOptionsDropdown setDelete={setIsDeleteDialogOpen} setIsEdit={setIsEdit} />
    </div>
  )
}
