import { useContext } from 'react'
import BackButon from './BackButton'
import { EntityOptionsDropdown } from './ui/custom/entity-option-dropdown'
import { SessionDetailContext } from '@/pages/SessionDetailPage'
import { ActivityDetailContext } from '@/pages/ActivityDetailPage'
import { ROUTE } from '@/constants/routes'

type EntityDetailHeaderProps = {
  backRoute: string
}

export default function EntityDetailHeader({ backRoute }: EntityDetailHeaderProps) {
  const { setIsDeleteDialogOpen, setIsEdit } = useContext(SessionDetailContext)
  const { setIsDeleteDialogOpen: setIsDeleteDialogOpenActivity, setIsEdit: setIsEditActivity } =
    useContext(ActivityDetailContext)

  return (
    <div className="flex flex-row justify-between p-4">
      {backRoute === ROUTE.SESSIONS && (
        <>
          <BackButon backRoute={backRoute} />
          <EntityOptionsDropdown setDelete={setIsDeleteDialogOpen} setIsEdit={setIsEdit} />
        </>
      )}
      {backRoute === ROUTE.ACTIVITIES && (
        <>
          <BackButon backRoute={backRoute} />
          <EntityOptionsDropdown
            setDelete={setIsDeleteDialogOpenActivity}
            setIsEdit={setIsEditActivity}
          />
        </>
      )}
    </div>
  )
}
